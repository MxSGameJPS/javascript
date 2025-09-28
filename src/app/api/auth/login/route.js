import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const res = await query(
      "SELECT id, email, password_hash, name FROM users WHERE email = $1",
      [email.toLowerCase()]
    );
    if (res.rows.length === 0)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const user = res.rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    // For now, return basic user info. In production return a signed token/session.
    return NextResponse.json(
      { user: { id: user.id, email: user.email, name: user.name } },
      { status: 200 }
    );
  } catch (err) {
    console.error("login error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

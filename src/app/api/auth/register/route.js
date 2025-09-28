import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      password,
      whatsapp,
      accepted_terms,
      accepted_whatsapp,
    } = body;

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password too short" },
        { status: 400 }
      );
    }

    // basic special character check
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return NextResponse.json(
        { error: "Password must include a special character" },
        { status: 400 }
      );
    }

    // check existing
    const exists = await query("SELECT id FROM users WHERE email = $1", [
      email.toLowerCase(),
    ]);
    if (exists.rows.length > 0) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const password_hash = await bcrypt.hash(password, 10);

    const res = await query(
      `INSERT INTO users (name, email, password_hash, whatsapp, accepted_terms, accepted_whatsapp)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, email, name, created_at`,
      [
        name,
        email.toLowerCase(),
        password_hash,
        whatsapp || null,
        !!accepted_terms,
        !!accepted_whatsapp,
      ]
    );

    const user = res.rows[0];

    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("register error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

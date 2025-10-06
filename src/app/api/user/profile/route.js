import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  const email = searchParams.get("email");
  const nameParam = searchParams.get("name");
  if (!userId && !email && !name) {
    return NextResponse.json(
      { error: "Missing user id, email or name" },
      { status: 400 }
    );
  }
  try {
    // Busca nome, email, heat e gems do usuário em uma única query
    let sql = `
      SELECT u.id, u.name, u.email, p.heat, p.gems
      FROM users u
      LEFT JOIN pontos p ON u.id = p.user_id
    `;
    let param = null;
    if (userId) {
      sql += " WHERE u.id = $1";
      param = userId;
    } else if (email) {
      sql += " WHERE u.email = $1";
      param = email.toLowerCase();
    } else if (name) {
      sql += " WHERE u.name = $1";
      param = name;
    }
    const res = await query(sql, [param]);
    if (res.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    const { name: dbName, email: dbEmail, heat, gems } = res.rows[0];
    return NextResponse.json({
      name: dbName,
      email: dbEmail,
      heat: heat || 0,
      gems: gems || 0,
    });
  } catch (err) {
    console.error("profile GET error", err && err.message ? err.message : err);
    return NextResponse.json(
      { error: "Erro ao buscar perfil" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { id, name } = await req.json();
    if (!id || !name) {
      return NextResponse.json(
        { error: "Missing id or name" },
        { status: 400 }
      );
    }
    await query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("profile PUT error", err);
    return NextResponse.json(
      { error: "Erro ao atualizar nome" },
      { status: 500 }
    );
  }
}

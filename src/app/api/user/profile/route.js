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
    return NextResponse.json(
      { error: "Erro ao atualizar nome" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
import { query } from "../../../../lib/db";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }
  try {
    // Busca nome, email, heat e gems do usuário em uma única query
    const sql = `
      SELECT u.name, u.email, p.heat, p.gems
      FROM users u
      LEFT JOIN pontos p ON u.id = p.user_id
      WHERE u.id = $1
    `;
    const res = await query(sql, [userId]);
    if (res.rows.length === 0) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    const { name, email, heat, gems } = res.rows[0];
    return NextResponse.json({ name, email, heat: heat || 0, gems: gems || 0 });
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar perfil" },
      { status: 500 }
    );
  }
}

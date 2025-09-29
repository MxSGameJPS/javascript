import { query } from "../lib/db";

export async function getUserPoints(userId) {
  // Busca os pontos de calor (heat) e gemas (gems) do usuário
  const sql = `
    SELECT heat, gems FROM pontos WHERE user_id = $1
  `;
  const result = await query(sql, [userId]);
  return result.rows[0] || { heat: 0, gems: 0 };
}

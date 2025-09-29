import { query } from "../lib/db";

export async function getTopUsersByGemas(limit = 10) {
  // Consulta para buscar os 10 usuários com mais gemas
  // Supondo que a tabela pontos tem user_id e gemas
  // e a tabela users tem id e nome (ou username)
  const sql = `
  SELECT u.id, u.name, p.gems
  FROM users u
  JOIN pontos p ON u.id = p.user_id
  ORDER BY p.gems DESC
    LIMIT $1
  `;
  const result = await query(sql, [limit]);
  return result.rows;
}

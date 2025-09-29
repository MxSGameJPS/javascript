import { NextResponse } from "next/server";
import { getUserPoints } from "../../../../data/userPoints";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("id");
  if (!userId) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }
  try {
    const points = await getUserPoints(userId);
    return NextResponse.json(points);
  } catch (err) {
    return NextResponse.json(
      { error: "Erro ao buscar pontos" },
      { status: 500 }
    );
  }
}

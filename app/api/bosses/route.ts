import { NextResponse } from "next/server";

interface Boss {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  drops: string[];
  healthPoints: number;
}

export async function GET() {
  const res = await fetch("https://eldenring.fanapis.com/api/bosses?limit=100");
  const data = await res.json();

  const bosses: Boss[] = data.data.map((boss: Boss) => ({
    id: boss.id,
    name: boss.name,
    image: boss.image,
    description: boss.description,
    location: boss.location,
    drops: boss.drops,
    healthPoints: boss.healthPoints,
  }));
  return bosses
    ? NextResponse.json(bosses)
    : NextResponse.json({ message: "No bosses found" });
}

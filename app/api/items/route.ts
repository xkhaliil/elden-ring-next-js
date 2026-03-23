import { NextResponse } from "next/server";

interface items {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  effect: string;
}

export async function GET() {
  const res = await fetch("https://eldenring.fanapis.com/api/items?limit=100");

  const data = await res.json();
  const items: items[] = data.data.map((item: items) => ({
    id: item.id,
    name: item.name,
    image: item.image,
    description: item.description,
    type: item.type,
    effect: item.effect,
  }));
  return items
    ? NextResponse.json(items)
    : NextResponse.json({ message: "No items found" });
}

import { NextResponse } from "next/server";

interface Weapons {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  weight: number;
  attack: [
    {
      name: string;
      amount: number;
    },
  ];
  defence: [
    {
      name: string;
      amount: number;
    },
  ];
  requiredAttributes: [
    {
      name: string;
      amount: number;
    },
  ];
  scalesWith: [{ name: string; scaling: string }];
}

export async function GET() {
  const res = await fetch(
    "https://eldenring.fanapis.com/api/weapons?limit=200",
  );

  const data = await res.json();
  const weapons: Weapons[] = data.data.map((weapon: Weapons) => ({
    id: weapon.id,
    name: weapon.name,
    image: weapon.image,
    description: weapon.description,
    category: weapon.category,
    weight: weapon.weight,
    attack: [{ name: weapon.attack[0].name, amount: weapon.attack[0].amount }],
    defence: [
      { name: weapon.defence[0].name, amount: weapon.defence[0].amount },
    ],
    requiredAttributes: [
      {
        name: weapon.requiredAttributes[0].name,
        amount: weapon.requiredAttributes[0].amount,
      },
    ],
    scalesWith: [
      {
        name: weapon.scalesWith[0].name,
        scaling: weapon.scalesWith[0].scaling,
      },
    ],
  }));
  return weapons
    ? NextResponse.json(weapons)
    : NextResponse.json({ message: "No weapons found" });
}

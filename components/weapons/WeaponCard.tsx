import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Shield, Swords, Weight, Zap } from "lucide-react";

export interface WeaponStat {
  name: string;
  amount: number;
}

export interface WeaponScaling {
  name: string;
  scaling: string;
}

export interface Weapon {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  weight: number;
  attack: WeaponStat[];
  defence: WeaponStat[];
  requiredAttributes: WeaponStat[];
  scalesWith: WeaponScaling[];
}

export type WeightFilter = "All" | "Light" | "Medium" | "Heavy" | "Colossal";

export function getWeightClass(weight: number): {
  label: WeightFilter;
  color: string;
} {
  if (!weight || weight === 0)
    return { label: "Light", color: "bg-sky-950 text-sky-400 border-sky-800" };
  if (weight < 5)
    return { label: "Light", color: "bg-sky-950 text-sky-400 border-sky-800" };
  if (weight < 10)
    return {
      label: "Medium",
      color: "bg-emerald-950 text-emerald-400 border-emerald-800",
    };
  if (weight < 18)
    return {
      label: "Heavy",
      color: "bg-amber-950 text-amber-400 border-amber-800",
    };
  return { label: "Colossal", color: "bg-red-950 text-red-400 border-red-800" };
}

export function getScalingColor(scaling: string): string {
  switch (scaling) {
    case "S":
      return "text-yellow-400";
    case "A":
      return "text-orange-400";
    case "B":
      return "text-emerald-400";
    case "C":
      return "text-sky-400";
    case "D":
      return "text-stone-400";
    default:
      return "text-stone-600";
  }
}

interface WeaponCardProps {
  weapon: Weapon;
  onClick?: () => void;
}

export function WeaponCard({ weapon, onClick }: WeaponCardProps) {
  const wc = getWeightClass(weapon.weight);
  const primaryAttack = weapon.attack?.[0];
  const primaryDefence = weapon.defence?.[0];
  const primaryReq = weapon.requiredAttributes?.[0];
  const primaryScaling = weapon.scalesWith?.[0];

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
    >
      <CardContent className="p-0">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden bg-stone-950">
          {weapon.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={weapon.image}
                alt={weapon.name}
                className="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Swords className="h-12 w-12 text-stone-800" />
            </div>
          )}

          <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
            <span
              className={`rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm ${wc.color}`}
            >
              {wc.label}
            </span>
            {weapon.category && (
              <span className="rounded-sm border border-stone-700 bg-stone-900/80 px-2 py-0.5 text-xs text-stone-400 backdrop-blur-sm">
                {weapon.category}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <h2 className="mb-1 text-base leading-tight font-semibold text-stone-100 transition-colors group-hover:text-red-300">
            {weapon.name}
          </h2>

          <p className="mb-3 line-clamp-2 text-xs text-stone-500 italic">
            {weapon.description || "No lore recorded."}
          </p>

          {/* Stats grid */}
          <div className="mb-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
            {primaryAttack && (
              <span className="flex items-center gap-1.5 text-stone-600">
                <Zap className="h-3 w-3 shrink-0 text-orange-700" />
                <span className="truncate">
                  {primaryAttack.name}{" "}
                  <span className="text-stone-400">{primaryAttack.amount}</span>
                </span>
              </span>
            )}
            {primaryDefence && (
              <span className="flex items-center gap-1.5 text-stone-600">
                <Shield className="h-3 w-3 shrink-0 text-sky-800" />
                <span className="truncate">
                  {primaryDefence.name}{" "}
                  <span className="text-stone-400">
                    {primaryDefence.amount}
                  </span>
                </span>
              </span>
            )}
            {primaryReq && (
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="text-stone-700">Req</span>
                <span className="truncate">
                  {primaryReq.name}{" "}
                  <span className="text-stone-400">{primaryReq.amount}</span>
                </span>
              </span>
            )}
            {primaryScaling && (
              <span className="flex items-center gap-1.5 text-stone-600">
                <span className="text-stone-700">Scale</span>
                <span className="truncate">
                  {primaryScaling.name}{" "}
                  <span
                    className={`font-bold ${getScalingColor(primaryScaling.scaling)}`}
                  >
                    {primaryScaling.scaling}
                  </span>
                </span>
              </span>
            )}
          </div>

          <Separator className="my-3 bg-stone-800" />

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-stone-600">
              <Weight className="h-3 w-3" />
              {weapon.weight ?? "—"}
            </span>
            <ChevronRight className="h-4 w-4 text-stone-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

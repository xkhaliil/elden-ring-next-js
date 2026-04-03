import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Flame, Shield, Skull } from "lucide-react";

export interface Boss {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  drops: string[];
  healthPoints: number;
}

export function getDifficulty(hp: number): {
  label: string;
  color: string;
  dot: string;
} {
  if (!hp || hp === 0)
    return {
      label: "Unknown",
      color: "bg-stone-900 text-stone-400 border-stone-700",
      dot: "bg-stone-400",
    };
  if (hp < 3000)
    return {
      label: "Medium",
      color: "bg-emerald-950 text-emerald-400 border-emerald-800",
      dot: "bg-emerald-400",
    };
  if (hp < 7000)
    return {
      label: "Hard",
      color: "bg-amber-950 text-amber-400 border-amber-800",
      dot: "bg-amber-400",
    };
  if (hp < 12000)
    return {
      label: "Very Hard",
      color: "bg-orange-950 text-orange-400 border-orange-800",
      dot: "bg-orange-400",
    };
  return {
    label: "Extreme",
    color: "bg-red-950 text-red-400 border-red-800",
    dot: "bg-red-500",
  };
}

interface BossCardProps {
  boss: Boss;
  onClick?: () => void;
}

export function BossCard({ boss, onClick }: BossCardProps) {
  const diff = getDifficulty(boss.healthPoints);

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
    >
      <CardContent className="p-0">
        <div className="relative h-56 w-full overflow-hidden bg-stone-950">
          {boss.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={boss.image}
                alt={boss.name}
                className="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Skull className="h-12 w-12 text-stone-800" />
            </div>
          )}

          <div className="absolute top-3 right-3">
            <span
              className={`flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm ${diff.color}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${diff.dot}`} />
              {diff.label}
            </span>
          </div>
        </div>

        <div className="px-4 py-4">
          <h2 className="mb-1 text-base leading-tight font-semibold text-stone-100 transition-colors group-hover:text-red-300">
            {boss.name}
          </h2>

          <p className="mb-3 line-clamp-2 text-xs text-stone-500 italic">
            {boss.description || "No lore recorded."}
          </p>

          <div className="flex flex-col gap-1.5 text-xs text-stone-600">
            {boss.location && (
              <span className="flex items-center gap-1.5">
                <Shield className="h-3 w-3 shrink-0" />
                <span className="truncate">{boss.location}</span>
              </span>
            )}
            {boss.drops?.length > 0 && (
              <span className="flex items-start gap-1.5">
                <Flame className="mt-0.5 h-3 w-3 shrink-0 text-orange-700" />
                <span className="line-clamp-1">
                  {boss.drops.slice(0, 2).join(", ")}
                  {boss.drops.length > 2 && ` +${boss.drops.length - 2} more`}
                </span>
              </span>
            )}
          </div>

          <Separator className="my-3 bg-stone-800" />

          <div className="flex items-center justify-between">
            {boss.healthPoints > 0 ? (
              <span className="text-xs text-stone-600">
                {boss.healthPoints.toLocaleString()}{" "}
                <span className="text-stone-700">HP</span>
              </span>
            ) : (
              <span />
            )}
            <ChevronRight className="h-4 w-4 text-stone-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

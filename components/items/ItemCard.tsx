import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Sparkles,
} from "lucide-react";

export interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  effect: string;
}

export function getTypeColor(type: string): string {
  const t = type?.toLowerCase() ?? "";
  if (t.includes("consumable") || t.includes("flask"))
    return "bg-emerald-950 text-emerald-400 border-emerald-800";
  if (t.includes("key"))
    return "bg-yellow-950 text-yellow-400 border-yellow-800";
  if (t.includes("material") || t.includes("smith"))
    return "bg-sky-950 text-sky-400 border-sky-800";
  if (t.includes("info") || t.includes("note"))
    return "bg-violet-950 text-violet-400 border-violet-800";
  if (t.includes("bolstering") || t.includes("crystal"))
    return "bg-orange-950 text-orange-400 border-orange-800";
  return "bg-stone-900 text-stone-400 border-stone-700";
}

interface ItemCardProps {
  item: Item;
  onClick?: () => void;
}

export function ItemCard({ item, onClick }: ItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeColor = getTypeColor(item.type);

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
    >
      <CardContent className="p-0">
        <div className="relative h-56 w-full overflow-hidden bg-stone-950">
          {item.image ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-stone-900 to-transparent" />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <FlaskConical className="h-12 w-12 text-stone-800" />
            </div>
          )}

          {item.type && (
            <div className="absolute top-3 right-3">
              <span
                className={`rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm ${typeColor}`}
              >
                {item.type}
              </span>
            </div>
          )}
        </div>

        <div className="px-4 py-4">
          <h2 className="mb-1 text-base leading-tight font-semibold text-stone-100 transition-colors group-hover:text-red-300">
            {item.name}
          </h2>

          <p className="mb-3 line-clamp-2 text-xs text-stone-500 italic">
            {item.description || "No lore recorded."}
          </p>

          {item.effect && (
            <div className="mb-3">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent card navigation on expand toggle
                  setIsExpanded((v) => !v);
                }}
                className="flex w-full items-start gap-1.5 text-left text-xs text-stone-600 transition-colors hover:text-stone-400"
              >
                <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-yellow-700" />
                <span className={isExpanded ? "" : "line-clamp-1"}>
                  {item.effect}
                </span>
                <ChevronDown
                  className={`ml-auto h-3 w-3 shrink-0 transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}

          <Separator className="my-3 bg-stone-800" />

          <div className="flex items-center justify-end">
            <ChevronRight className="h-4 w-4 text-stone-700 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-red-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

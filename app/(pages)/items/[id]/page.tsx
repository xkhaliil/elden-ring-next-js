"use client";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  FlaskConical,
  Loader2,
  Skull,
  Sparkles,
  Tag,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  effect: string;
}

function getTypeColor(type: string): string {
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

export default function ItemDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Item[]) => {
        const found = data.find((i) => i.id === id);
        if (!found) throw new Error("Item not found");
        setItem(found);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div
      className="min-h-screen bg-[#0a0804] text-stone-200"
      style={{ fontFamily: "'Crimson Text', Georgia, serif" }}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="h-px w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      {loading && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-red-700" />
          <p className="text-stone-600 italic">Unearthing the relic…</p>
        </div>
      )}

      {error && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <Skull className="h-10 w-10 text-red-800" />
          <p className="text-red-700 italic">This relic has been lost.</p>
          <p className="text-sm text-stone-600">{error}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 flex items-center gap-2 rounded-sm border border-stone-800 px-4 py-2 text-sm text-stone-500 transition-colors hover:border-stone-600 hover:text-stone-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      )}

      {!loading &&
        !error &&
        item &&
        (() => {
          const typeColor = getTypeColor(item.type);

          return (
            <div className="mx-auto mt-10 max-w-4xl px-6 py-12">
              <button
                onClick={() => router.back()}
                className="mb-10 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-red-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Items
              </button>

              <div className="relative mb-12 overflow-hidden rounded-sm border border-stone-800/60">
                {item.image ? (
                  <div className="relative h-80 w-full sm:h-96">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0804] via-[#0a0804]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0804]/60 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8">
                      <div className="mb-3 flex items-center gap-3 text-red-600">
                        <div className="h-px w-8 bg-red-600" />
                        <FlaskConical className="h-4 w-4" />
                      </div>
                      <h1
                        className="text-4xl font-bold text-stone-100 sm:text-5xl"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                      >
                        {item.name}
                      </h1>
                      {item.type && (
                        <div className="mt-3">
                          <span
                            className={`rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm ${typeColor}`}
                          >
                            {item.type}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-stone-950">
                    <FlaskConical className="h-16 w-16 text-stone-800" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px w-6 bg-red-800" />
                      <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                        Lore
                      </h2>
                    </div>
                    <p className="text-lg leading-relaxed text-stone-300 italic">
                      {item.description ||
                        "No lore has been recorded for this relic."}
                    </p>
                  </div>

                  {item.effect && (
                    <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-6 bg-red-800" />
                        <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                          Effect
                        </h2>
                      </div>
                      <div className="flex items-start gap-3 rounded-sm border border-yellow-900/30 bg-yellow-950/10 p-4">
                        <Sparkles className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-700" />
                        <p className="leading-relaxed text-stone-300">
                          {item.effect}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px w-6 bg-red-800" />
                      <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                        Details
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Tag className="h-3.5 w-3.5" />
                          Type
                        </span>
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-xs ${typeColor}`}
                        >
                          {item.type || "Unknown"}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Sparkles className="h-3.5 w-3.5" />
                          Has Effect
                        </span>
                        <span
                          className={`text-sm font-semibold ${item.effect ? "text-emerald-400" : "text-stone-600"}`}
                        >
                          {item.effect ? "Yes" : "No"}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <FlaskConical className="h-3.5 w-3.5" />
                          Rarity
                        </span>
                        <span className="text-sm text-stone-300">
                          {item.type?.toLowerCase().includes("key")
                            ? "Unique"
                            : "Common"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
                    <p className="text-center text-xs text-red-900/60 italic">
                      Every relic holds a fragment of a forgotten age.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex items-center justify-center gap-3 text-stone-800">
                <div className="h-px flex-1 bg-stone-900" />
                <FlaskConical className="h-4 w-4" />
                <div className="h-px flex-1 bg-stone-900" />
              </div>
            </div>
          );
        })()}
    </div>
  );
}

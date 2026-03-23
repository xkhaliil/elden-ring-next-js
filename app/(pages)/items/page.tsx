"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  Loader2,
  Search,
  Skull,
  Sparkles,
  X,
} from "lucide-react";

const PAGE_SIZE = 9;

interface Item {
  id: string;
  name: string;
  image: string;
  description: string;
  type: string;
  effect: string;
}

const PILL =
  "rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer";
const PILL_ACTIVE = "border-red-700 bg-red-950 text-red-400";
const PILL_IDLE =
  "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300";

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

type EffectFilter = "All" | "Has Effect" | "No Effect";

export default function Items() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [effectFilter, setEffectFilter] = useState<EffectFilter>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/items")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch items");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function resetFilters() {
    setQuery("");
    setTypeFilter("All");
    setEffectFilter("All");
    setPage(1);
  }

  function handle<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const types = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((i) => i.type).filter(Boolean)),
    );
    return ["All", ...unique.sort()];
  }, [items]);

  const hasActiveFilters =
    query !== "" || typeFilter !== "All" || effectFilter !== "All";

  const filtered = useMemo(() => {
    return items.filter((item) => {
      if (
        query &&
        !item.name.toLowerCase().includes(query.toLowerCase()) &&
        !item.type?.toLowerCase().includes(query.toLowerCase()) &&
        !item.effect?.toLowerCase().includes(query.toLowerCase()) &&
        !item.description?.toLowerCase().includes(query.toLowerCase())
      )
        return false;

      if (typeFilter !== "All" && item.type !== typeFilter) return false;

      if (effectFilter === "Has Effect" && !item.effect) return false;
      if (effectFilter === "No Effect" && item.effect) return false;

      return true;
    });
  }, [items, query, typeFilter, effectFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const effectOptions: EffectFilter[] = ["All", "Has Effect", "No Effect"];

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

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-red-600">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-600" />
            <FlaskConical className="h-5 w-5" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-600" />
          </div>

          <h1
            className="mb-3 text-6xl font-bold tracking-widest text-red-600"
            style={{
              textShadow:
                "0 0 40px rgba(220,38,38,0.4), 0 2px 4px rgba(0,0,0,0.8)",
              letterSpacing: "0.15em",
            }}
          >
            ITEMS
          </h1>

          <p className="mx-auto max-w-md text-lg text-stone-500 italic">
            Relics and remedies scattered across the Lands Between
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-red-700 opacity-60">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-red-700" />
            <div className="h-1.5 w-1.5 rotate-45 bg-red-700" />
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-red-700" />
          </div>
        </div>

        <div className="mb-10 space-y-5">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <Input
              value={query}
              onChange={(e) => handle<string>(setQuery)(e.target.value)}
              placeholder="Search by name, type, or effect…"
              className="border-stone-700 bg-stone-900/60 pl-11 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
            />
          </div>

          {!loading && (
            <div className="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {types.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handle<string>(setTypeFilter)(opt)}
                      className={`${PILL} ${typeFilter === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-stone-800" />

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Effect
                </p>
                <div className="flex flex-wrap gap-2">
                  {effectOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handle<EffectFilter>(setEffectFilter)(opt)}
                      className={`${PILL} ${effectFilter === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-4 py-32">
            <Loader2 className="h-8 w-8 animate-spin text-red-700" />
            <p className="text-stone-600 italic">Unearthing the relics…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-3 py-32">
            <Skull className="h-8 w-8 text-red-800" />
            <p className="text-red-700 italic">The treasury remains sealed.</p>
            <p className="text-sm text-stone-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mb-6 flex items-center justify-between text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-3.5 w-3.5" />
              <span>
                {filtered.length} {filtered.length === 1 ? "item" : "items"}{" "}
                found
              </span>
            </div>
            {totalPages > 1 && (
              <span>
                Page {page} of {totalPages}
              </span>
            )}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {paginated.length === 0 && (
              <div className="col-span-full py-24 text-center text-stone-600 italic">
                No item answers your call…
              </div>
            )}

            {paginated.map((item) => {
              const typeColor = getTypeColor(item.type);
              const isExpanded = expanded === item.id;

              return (
                <Card
                  key={item.id}
                  className="group cursor-pointer overflow-hidden border-stone-800/60 bg-stone-900/30 transition-all duration-300 hover:border-red-900 hover:bg-stone-900/60"
                >
                  <CardContent className="p-0">
                    <div className="relative h-56 w-full overflow-hidden bg-stone-950">
                      {item.image ? (
                        <>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover opacity-75 grayscale transition-all duration-500 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                          />
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-900 to-transparent" />
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
                            onClick={() =>
                              setExpanded(isExpanded ? null : item.id)
                            }
                            className="flex w-full items-start gap-1.5 text-left text-xs text-stone-600 transition-colors hover:text-stone-400"
                          >
                            <Sparkles className="mt-0.5 h-3 w-3 flex-shrink-0 text-yellow-700" />
                            <span className={isExpanded ? "" : "line-clamp-1"}>
                              {item.effect}
                            </span>
                            <ChevronDown
                              className={`ml-auto h-3 w-3 flex-shrink-0 transition-transform duration-200 ${
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
            })}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-stone-800 bg-stone-900/40 text-stone-500 transition-all duration-200 hover:border-stone-600 hover:text-stone-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce<(number | "...")[]>((acc, p, idx, arr) => {
                if (idx > 0 && p - (arr[idx - 1] as number) > 1)
                  acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, idx) =>
                p === "..." ? (
                  <span key={`ellipsis-${idx}`} className="px-1 text-stone-700">
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setPage(p as number)}
                    className={`flex h-9 w-9 items-center justify-center rounded-sm border text-sm transition-all duration-200 ${
                      page === p
                        ? "border-red-800 bg-red-950 text-red-400"
                        : "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300"
                    }`}
                  >
                    {p}
                  </button>
                ),
              )}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex h-9 w-9 items-center justify-center rounded-sm border border-stone-800 bg-stone-900/40 text-stone-500 transition-all duration-200 hover:border-stone-600 hover:text-stone-300 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-16 flex items-center justify-center gap-3 text-stone-800">
          <div className="h-px flex-1 bg-stone-900" />
          <FlaskConical className="h-4 w-4" />
          <div className="h-px flex-1 bg-stone-900" />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Loader2,
  Search,
  Shield,
  Skull,
  Swords,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 9;

interface Boss {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  drops: string[];
  healthPoints: number;
}

type DifficultyFilter =
  | "All"
  | "Unknown"
  | "Medium"
  | "Hard"
  | "Very Hard"
  | "Extreme";
type DropsFilter = "All" | "Has Drops" | "No Drops";

function getDifficulty(hp: number): {
  label: DifficultyFilter;
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

const PILL =
  "rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer";
const PILL_ACTIVE = "border-red-700 bg-red-950 text-red-400";
const PILL_IDLE =
  "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300";

export default function Bosses() {
  const router = useRouter();
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [dropsFilter, setDropsFilter] = useState<DropsFilter>("All");
  const [minHp, setMinHp] = useState("");
  const [maxHp, setMaxHp] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/bosses")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bosses");
        return res.json();
      })
      .then((data) => setBosses(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function resetFilters() {
    setQuery("");
    setDifficulty("All");
    setDropsFilter("All");
    setMinHp("");
    setMaxHp("");
    setPage(1);
  }

  function handle<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const hasActiveFilters =
    query !== "" ||
    difficulty !== "All" ||
    dropsFilter !== "All" ||
    minHp !== "" ||
    maxHp !== "";

  const filtered = useMemo(() => {
    const min = minHp !== "" ? Number(minHp) : null;
    const max = maxHp !== "" ? Number(maxHp) : null;

    return bosses.filter((boss) => {
      const diff = getDifficulty(boss.healthPoints);

      if (
        query &&
        !boss.name.toLowerCase().includes(query.toLowerCase()) &&
        !boss.location?.toLowerCase().includes(query.toLowerCase()) &&
        !boss.drops?.some((d) => d.toLowerCase().includes(query.toLowerCase()))
      )
        return false;

      if (difficulty !== "All" && diff.label !== difficulty) return false;

      if (
        dropsFilter === "Has Drops" &&
        (!boss.drops || boss.drops.length === 0)
      )
        return false;
      if (dropsFilter === "No Drops" && boss.drops && boss.drops.length > 0)
        return false;

      if (min !== null && boss.healthPoints < min) return false;
      if (max !== null && boss.healthPoints > max) return false;

      return true;
    });
  }, [bosses, query, difficulty, dropsFilter, minHp, maxHp]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const difficultyOptions: DifficultyFilter[] = [
    "All",
    "Unknown",
    "Medium",
    "Hard",
    "Very Hard",
    "Extreme",
  ];
  const dropsOptions: DropsFilter[] = ["All", "Has Drops", "No Drops"];

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
            <Skull className="h-5 w-5" />
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
            BOSSES
          </h1>

          <p className="mx-auto max-w-md text-lg text-stone-500 italic">
            Legends of the Shattered Realm
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
              placeholder="Search by name, location, or drop…"
              className="border-stone-700 bg-stone-900/60 pl-11 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
            />
          </div>

          {!loading && (
            <div className="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Difficulty
                </p>
                <div className="flex flex-wrap gap-2">
                  {difficultyOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        handle<DifficultyFilter>(setDifficulty)(opt)
                      }
                      className={`${PILL} ${difficulty === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-stone-800" />

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Drops
                </p>
                <div className="flex flex-wrap gap-2">
                  {dropsOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handle<DropsFilter>(setDropsFilter)(opt)}
                      className={`${PILL} ${dropsFilter === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-stone-800" />

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Health Points Range
                </p>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={minHp}
                    onChange={(e) => handle<string>(setMinHp)(e.target.value)}
                    placeholder="Min HP"
                    className="border-stone-700 bg-stone-900/60 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
                  />
                  <span className="text-stone-700">—</span>
                  <Input
                    type="number"
                    value={maxHp}
                    onChange={(e) => handle<string>(setMaxHp)(e.target.value)}
                    placeholder="Max HP"
                    className="border-stone-700 bg-stone-900/60 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
                  />
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
            <p className="text-stone-600 italic">Summoning the fallen…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-3 py-32">
            <Skull className="h-8 w-8 text-red-800" />
            <p className="text-red-700 italic">The fog gate remains sealed.</p>
            <p className="text-sm text-stone-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mb-6 flex items-center justify-between text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Swords className="h-3.5 w-3.5" />
              <span>
                {filtered.length} {filtered.length === 1 ? "enemy" : "enemies"}{" "}
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
                No boss answers your call…
              </div>
            )}

            {paginated.map((boss) => {
              const diff = getDifficulty(boss.healthPoints);
              return (
                <Card
                  key={boss.id}
                  onClick={() => router.push(`/bosses/${boss.id}`)}
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
                          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-900 to-transparent" />
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
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${diff.dot}`}
                          />
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
                            <Shield className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{boss.location}</span>
                          </span>
                        )}
                        {boss.drops?.length > 0 && (
                          <span className="flex items-start gap-1.5">
                            <Flame className="mt-0.5 h-3 w-3 flex-shrink-0 text-orange-700" />
                            <span className="line-clamp-1">
                              {boss.drops.slice(0, 2).join(", ")}
                              {boss.drops.length > 2 &&
                                ` +${boss.drops.length - 2} more`}
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
          <Skull className="h-4 w-4" />
          <div className="h-px flex-1 bg-stone-900" />
        </div>
      </div>
    </div>
  );
}

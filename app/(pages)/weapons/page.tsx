"use client";

import { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { getWeightClass, WeaponCard } from "@/components/weapons/WeaponCard";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Search,
  Skull,
  Swords,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 9;

interface WeaponStat {
  name: string;
  amount: number;
}

interface WeaponScaling {
  name: string;
  scaling: string;
}

interface Weapon {
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

type WeightFilter = "All" | "Light" | "Medium" | "Heavy" | "Colossal";
type ScalingFilter = "All" | "S" | "A" | "B" | "C" | "D" | "E";

const PILL =
  "rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer";
const PILL_ACTIVE = "border-red-700 bg-red-950 text-red-400";
const PILL_IDLE =
  "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300";

export default function Weapons() {
  const router = useRouter();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [weightClass, setWeightClass] = useState<WeightFilter>("All");
  const [scalingFilter, setScalingFilter] = useState<ScalingFilter>("All");
  const [minAttack, setMinAttack] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch("/api/weapons")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch weapons");
        return res.json();
      })
      .then((data) => setWeapons(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function resetFilters() {
    setQuery("");
    setCategory("All");
    setWeightClass("All");
    setScalingFilter("All");
    setMinAttack("");
    setPage(1);
  }

  function handle<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(weapons.map((w) => w.category).filter(Boolean)),
    );
    return ["All", ...unique.sort()];
  }, [weapons]);

  const hasActiveFilters =
    query !== "" ||
    category !== "All" ||
    weightClass !== "All" ||
    scalingFilter !== "All" ||
    minAttack !== "";

  const filtered = useMemo(() => {
    const minAtk = minAttack !== "" ? Number(minAttack) : null;

    return weapons.filter((weapon) => {
      const wc = getWeightClass(weapon.weight);

      if (
        query &&
        !weapon.name.toLowerCase().includes(query.toLowerCase()) &&
        !weapon.category?.toLowerCase().includes(query.toLowerCase()) &&
        !weapon.description?.toLowerCase().includes(query.toLowerCase())
      )
        return false;

      if (category !== "All" && weapon.category !== category) return false;

      if (weightClass !== "All" && wc.label !== weightClass) return false;

      if (
        scalingFilter !== "All" &&
        !weapon.scalesWith?.some((s) => s.scaling === scalingFilter)
      )
        return false;

      if (minAtk !== null && (weapon.attack?.[0]?.amount ?? 0) < minAtk)
        return false;

      return true;
    });
  }, [weapons, query, category, weightClass, scalingFilter, minAttack]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const weightOptions: WeightFilter[] = [
    "All",
    "Light",
    "Medium",
    "Heavy",
    "Colossal",
  ];
  const scalingOptions: ScalingFilter[] = ["All", "S", "A", "B", "C", "D", "E"];

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

      <div className="h-px w-full bg-linear-to-r from-transparent via-red-600 to-transparent" />

      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3 text-red-600">
            <div className="h-px w-16 bg-linear-to-r from-transparent to-red-600" />
            <Swords className="h-5 w-5" />
            <div className="h-px w-16 bg-linear-to-l from-transparent to-red-600" />
          </div>

          <h1
            className="mb-3 text-6xl font-bold tracking-widest text-red-600"
            style={{
              textShadow:
                "0 0 40px rgba(220,38,38,0.4), 0 2px 4px rgba(0,0,0,0.8)",
              letterSpacing: "0.15em",
            }}
          >
            WEAPONS
          </h1>

          <p className="mx-auto max-w-md text-lg text-stone-500 italic">
            Instruments of ruin, forged in the Lands Between
          </p>

          <div className="mt-6 flex items-center justify-center gap-3 text-red-700 opacity-60">
            <div className="h-px w-24 bg-linear-to-r from-transparent to-red-700" />
            <div className="h-1.5 w-1.5 rotate-45 bg-red-700" />
            <div className="h-px w-24 bg-linear-to-l from-transparent to-red-700" />
          </div>
        </div>

        <div className="mb-10 space-y-5">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-500" />
            <Input
              value={query}
              onChange={(e) => handle<string>(setQuery)(e.target.value)}
              placeholder="Search by name, category, or description…"
              className="border-stone-700 bg-stone-900/60 pl-11 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
            />
          </div>

          {!loading && (
            <div className="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handle<string>(setCategory)(opt)}
                      className={`${PILL} ${category === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-stone-800" />

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Weight Class
                </p>
                <div className="flex flex-wrap gap-2">
                  {weightOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handle<WeightFilter>(setWeightClass)(opt)}
                      className={`${PILL} ${weightClass === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-stone-800" />

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Best Scaling Grade
                </p>
                <div className="flex flex-wrap gap-2">
                  {scalingOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() =>
                        handle<ScalingFilter>(setScalingFilter)(opt)
                      }
                      className={`${PILL} ${scalingFilter === opt ? PILL_ACTIVE : PILL_IDLE}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <Separator className="bg-stone-800" />

              <div className="space-y-2">
                <p className="text-xs tracking-widest text-stone-600 uppercase">
                  Min Attack Power
                </p>
                <div className="w-48">
                  <Input
                    type="number"
                    value={minAttack}
                    onChange={(e) =>
                      handle<string>(setMinAttack)(e.target.value)
                    }
                    placeholder="e.g. 100"
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
            <p className="text-stone-600 italic">Forging the arsenal…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-3 py-32">
            <Skull className="h-8 w-8 text-red-800" />
            <p className="text-red-700 italic">The armory remains sealed.</p>
            <p className="text-sm text-stone-600">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="mb-6 flex items-center justify-between text-sm text-stone-600">
            <div className="flex items-center gap-2">
              <Swords className="h-3.5 w-3.5" />
              <span>
                {filtered.length} {filtered.length === 1 ? "weapon" : "weapons"}{" "}
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
                No weapon answers your call…
              </div>
            )}

            {paginated.map((weapon) => (
              <WeaponCard
                key={weapon.id}
                weapon={weapon}
                onClick={() => router.push(`/weapons/${weapon.id}`)}
              />
            ))}
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
          <Swords className="h-4 w-4" />
          <div className="h-px flex-1 bg-stone-900" />
        </div>
      </div>
    </div>
  );
}

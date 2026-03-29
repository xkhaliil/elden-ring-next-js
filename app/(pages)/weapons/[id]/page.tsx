"use client";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Loader2,
  Shield,
  Skull,
  Star,
  Swords,
  Weight,
  Zap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

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

function getWeightClass(weight: number): { label: string; color: string } {
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

function getScalingColor(scaling: string): string {
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

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-stone-500">{label}</span>
        <span className="font-semibold text-stone-300">{value}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function WeaponDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/weapons")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Weapon[]) => {
        const found = data.find((w) => w.id === id);
        if (!found) throw new Error("Weapon not found");
        setWeapon(found);
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
          <p className="text-stone-600 italic">Forging the details…</p>
        </div>
      )}

      {error && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <Swords className="h-10 w-10 text-red-800" />
          <p className="text-red-700 italic">
            This weapon is lost to the ages.
          </p>
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
        weapon &&
        (() => {
          const wc = getWeightClass(weapon.weight);
          const maxAttack = 200;

          return (
            <div className="mx-auto mt-10 max-w-4xl px-6 py-12">
              <button
                onClick={() => router.back()}
                className="mb-10 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-red-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Weapons
              </button>

              <div className="relative mb-12 overflow-hidden rounded-sm border border-stone-800/60">
                {weapon.image ? (
                  <div className="relative h-80 w-full sm:h-96">
                    <img
                      src={weapon.image}
                      alt={weapon.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0804] via-[#0a0804]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0804]/60 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8">
                      <div className="mb-3 flex items-center gap-3 text-red-600">
                        <div className="h-px w-8 bg-red-600" />
                        <Swords className="h-4 w-4" />
                      </div>
                      <h1
                        className="text-4xl font-bold text-stone-100 sm:text-5xl"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                      >
                        {weapon.name}
                      </h1>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {weapon.category && (
                          <span className="rounded-sm border border-stone-700 bg-stone-900/70 px-2 py-0.5 text-xs text-stone-400 backdrop-blur-sm">
                            {weapon.category}
                          </span>
                        )}
                        <span
                          className={`rounded-sm border px-2 py-0.5 text-xs backdrop-blur-sm ${wc.color}`}
                        >
                          {wc.label}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-stone-950">
                    <Swords className="h-16 w-16 text-stone-800" />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-6 lg:col-span-2">
                  <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="h-px w-6 bg-red-800" />
                      <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                        Description
                      </h2>
                    </div>
                    <p className="text-lg leading-relaxed text-stone-300 italic">
                      {weapon.description || "No description recorded."}
                    </p>
                  </div>

                  {weapon.attack && weapon.attack.length > 0 && (
                    <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="h-px w-6 bg-red-800" />
                        <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                          Attack Power
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {weapon.attack.map((atk, i) => (
                          <StatBar
                            key={i}
                            label={atk.name}
                            value={atk.amount}
                            max={maxAttack}
                            color="bg-orange-700"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {weapon.defence && weapon.defence.length > 0 && (
                    <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                      <div className="mb-5 flex items-center gap-3">
                        <div className="h-px w-6 bg-red-800" />
                        <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                          Damage Negation
                        </h2>
                      </div>
                      <div className="space-y-4">
                        {weapon.defence.map((def, i) => (
                          <StatBar
                            key={i}
                            label={def.name}
                            value={def.amount}
                            max={100}
                            color="bg-sky-700"
                          />
                        ))}
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
                          <Weight className="h-3.5 w-3.5" />
                          Weight
                        </span>
                        <span className="text-sm text-stone-300">
                          {weapon.weight ?? "—"}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Swords className="h-3.5 w-3.5" />
                          Category
                        </span>
                        <span className="text-sm text-stone-300">
                          {weapon.category || "—"}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Shield className="h-3.5 w-3.5" />
                          Weight Class
                        </span>
                        <span
                          className={`text-sm font-semibold ${wc.color.split(" ").find((c) => c.startsWith("text-"))}`}
                        >
                          {wc.label}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Zap className="h-3.5 w-3.5" />
                          Base Attack
                        </span>
                        <span className="text-sm text-stone-300">
                          {weapon.attack?.[0]?.amount ?? "—"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {weapon.requiredAttributes &&
                    weapon.requiredAttributes.length > 0 && (
                      <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                        <div className="mb-4 flex items-center gap-3">
                          <div className="h-px w-6 bg-red-800" />
                          <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                            Requirements
                          </h2>
                        </div>
                        <div className="space-y-3">
                          {weapon.requiredAttributes.map((req, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm text-stone-500">
                                {req.name}
                              </span>
                              <span className="rounded-sm border border-stone-700 bg-stone-900 px-2 py-0.5 text-xs text-stone-300">
                                {req.amount}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {weapon.scalesWith && weapon.scalesWith.length > 0 && (
                    <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-6 bg-red-800" />
                        <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                          Scaling
                        </h2>
                      </div>
                      <div className="space-y-3">
                        {weapon.scalesWith.map((scale, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between"
                          >
                            <span className="flex items-center gap-1.5 text-sm text-stone-500">
                              <Star className="h-3 w-3" />
                              {scale.name}
                            </span>
                            <span
                              className={`text-lg font-bold ${getScalingColor(scale.scaling)}`}
                            >
                              {scale.scaling}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
                    <p className="text-center text-xs text-red-900/60 italic">
                      Every blade tells a story of ruin.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex items-center justify-center gap-3 text-stone-800">
                <div className="h-px flex-1 bg-stone-900" />
                <Swords className="h-4 w-4" />
                <div className="h-px flex-1 bg-stone-900" />
              </div>
            </div>
          );
        })()}
    </div>
  );
}

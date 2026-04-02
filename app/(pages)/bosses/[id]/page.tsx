"use client";

import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Flame,
  Heart,
  Loader2,
  MapPin,
  Package,
  Shield,
  Skull,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";

interface Boss {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  drops: string[];
  healthPoints: number;
}

type DifficultyLabel = "Unknown" | "Medium" | "Hard" | "Very Hard" | "Extreme";

function getDifficulty(hp: number): {
  label: DifficultyLabel;
  color: string;
  bar: string;
  dot: string;
  percent: number;
} {
  if (!hp || hp === 0)
    return {
      label: "Unknown",
      color: "text-stone-400",
      bar: "bg-stone-600",
      dot: "bg-stone-400",
      percent: 0,
    };
  if (hp < 3000)
    return {
      label: "Medium",
      color: "text-emerald-400",
      bar: "bg-emerald-600",
      dot: "bg-emerald-400",
      percent: 25,
    };
  if (hp < 7000)
    return {
      label: "Hard",
      color: "text-amber-400",
      bar: "bg-amber-600",
      dot: "bg-amber-400",
      percent: 50,
    };
  if (hp < 12000)
    return {
      label: "Very Hard",
      color: "text-orange-400",
      bar: "bg-orange-600",
      dot: "bg-orange-400",
      percent: 75,
    };
  return {
    label: "Extreme",
    color: "text-red-400",
    bar: "bg-red-600",
    dot: "bg-red-500",
    percent: 100,
  };
}

export default function BossDetail() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [boss, setBoss] = useState<Boss | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/bosses")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data: Boss[]) => {
        const found = data.find((b) => b.id === id);
        if (!found) throw new Error("Boss not found");
        setBoss(found);
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
          <p className="text-stone-600 italic">Summoning the fallen…</p>
        </div>
      )}

      {error && (
        <div className="flex min-h-screen flex-col items-center justify-center gap-3">
          <Skull className="h-10 w-10 text-red-800" />
          <p className="text-red-700 italic">The fog gate remains sealed.</p>
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
        boss &&
        (() => {
          const diff = getDifficulty(boss.healthPoints);
          return (
            <div className="mx-auto mt-10 max-w-4xl px-6 py-12">
              <button
                onClick={() => router.back()}
                className="mb-10 flex items-center gap-2 text-sm text-stone-600 transition-colors hover:text-red-500"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Bosses
              </button>

              <div className="relative mb-12 overflow-hidden rounded-sm border border-stone-800/60">
                {boss.image ? (
                  <div className="relative h-80 w-full sm:h-96">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={boss.image}
                      alt={boss.name}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0804] via-[#0a0804]/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0804]/60 via-transparent to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8">
                      <div className="mb-3 flex items-center gap-3 text-red-600">
                        <div className="h-px w-8 bg-red-600" />
                        <Skull className="h-4 w-4" />
                      </div>
                      <h1
                        className="text-4xl font-bold text-stone-100 sm:text-5xl"
                        style={{ textShadow: "0 2px 20px rgba(0,0,0,0.8)" }}
                      >
                        {boss.name}
                      </h1>
                      {boss.location && (
                        <p className="mt-2 flex items-center gap-1.5 text-stone-400">
                          <MapPin className="h-3.5 w-3.5" />
                          {boss.location}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex h-64 w-full items-center justify-center bg-stone-950">
                    <Skull className="h-16 w-16 text-stone-800" />
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
                      {boss.description ||
                        "No lore has been recorded for this entity."}
                    </p>
                  </div>

                  {boss.drops && boss.drops.length > 0 && (
                    <div className="rounded-sm border border-stone-800/60 bg-stone-900/20 p-6">
                      <div className="mb-4 flex items-center gap-3">
                        <div className="h-px w-6 bg-red-800" />
                        <h2 className="text-xs tracking-widest text-stone-500 uppercase">
                          Drops
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {boss.drops.map((drop, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 rounded-sm border border-stone-800 bg-stone-900/40 px-3 py-2.5"
                          >
                            <Flame className="h-3.5 w-3.5 flex-shrink-0 text-orange-700" />
                            <span className="text-sm text-stone-300">
                              {drop}
                            </span>
                          </div>
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
                        Stats
                      </h2>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="flex items-center gap-1.5 text-stone-500">
                            <Heart className="h-3.5 w-3.5 text-red-800" />
                            Health Points
                          </span>
                          <span className="font-semibold text-stone-300">
                            {boss.healthPoints > 0
                              ? boss.healthPoints.toLocaleString()
                              : "—"}
                          </span>
                        </div>
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-stone-800">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${diff.bar}`}
                            style={{ width: `${diff.percent}%` }}
                          />
                        </div>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Skull className="h-3.5 w-3.5" />
                          Difficulty
                        </span>
                        <span
                          className={`flex items-center gap-1.5 text-sm font-semibold ${diff.color}`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${diff.dot}`}
                          />
                          {diff.label}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <MapPin className="h-3.5 w-3.5" />
                          Location
                        </span>
                        <span className="max-w-[55%] text-right text-sm text-stone-300">
                          {boss.location || "Unknown"}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Package className="h-3.5 w-3.5" />
                          Drops
                        </span>
                        <span className="text-sm text-stone-300">
                          {boss.drops?.length > 0
                            ? `${boss.drops.length} item${boss.drops.length > 1 ? "s" : ""}`
                            : "None"}
                        </span>
                      </div>

                      <Separator className="bg-stone-800" />

                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-sm text-stone-500">
                          <Shield className="h-3.5 w-3.5" />
                          Type
                        </span>
                        <span className="text-sm text-stone-300">
                          Field Boss
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-sm border border-red-900/30 bg-red-950/10 p-4">
                    <p className="text-center text-xs text-red-900/60 italic">
                      Tread carefully, Tarnished. Death is not the end.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-16 flex items-center justify-center gap-3 text-stone-800">
                <div className="h-px flex-1 bg-stone-900" />
                <Skull className="h-4 w-4" />
                <div className="h-px flex-1 bg-stone-900" />
              </div>
            </div>
          );
        })()}
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";

export type DifficultyFilter =
  | "All"
  | "Unknown"
  | "Medium"
  | "Hard"
  | "Very Hard"
  | "Extreme";
export type DropsFilter = "All" | "Has Drops" | "No Drops";

const PILL =
  "rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer";
const PILL_ACTIVE = "border-red-700 bg-red-950 text-red-400";
const PILL_IDLE =
  "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300";

const DIFFICULTY_OPTIONS: DifficultyFilter[] = [
  "All",
  "Unknown",
  "Medium",
  "Hard",
  "Very Hard",
  "Extreme",
];
const DROPS_OPTIONS: DropsFilter[] = ["All", "Has Drops", "No Drops"];

export interface BossFilterProps {
  query: string;
  difficulty: DifficultyFilter;
  dropsFilter: DropsFilter;
  minHp: string;
  maxHp: string;
  onQueryChange: (v: string) => void;
  onDifficultyChange: (v: DifficultyFilter) => void;
  onDropsFilterChange: (v: DropsFilter) => void;
  onMinHpChange: (v: string) => void;
  onMaxHpChange: (v: string) => void;
  onReset: () => void;
}

export function BossFilter({
  query,
  difficulty,
  dropsFilter,
  minHp,
  maxHp,
  onQueryChange,
  onDifficultyChange,
  onDropsFilterChange,
  onMinHpChange,
  onMaxHpChange,
  onReset,
}: BossFilterProps) {
  const hasActiveFilters =
    query !== "" ||
    difficulty !== "All" ||
    dropsFilter !== "All" ||
    minHp !== "" ||
    maxHp !== "";

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-500" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, location, or drop…"
          className="border-stone-700 bg-stone-900/60 pl-11 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
        />
      </div>

      <div className="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-stone-600 uppercase">
            Difficulty
          </p>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTY_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onDifficultyChange(opt)}
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
            {DROPS_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onDropsFilterChange(opt)}
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
              onChange={(e) => onMinHpChange(e.target.value)}
              placeholder="Min HP"
              className="border-stone-700 bg-stone-900/60 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
            />
            <span className="text-stone-700">—</span>
            <Input
              type="number"
              value={maxHp}
              onChange={(e) => onMaxHpChange(e.target.value)}
              placeholder="Max HP"
              className="border-stone-700 bg-stone-900/60 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
            />
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-stone-600 transition-colors hover:text-red-500"
          >
            <X className="h-3 w-3" />
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}

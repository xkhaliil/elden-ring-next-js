import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";

export type WeightFilter = "All" | "Light" | "Medium" | "Heavy" | "Colossal";
export type ScalingFilter = "All" | "S" | "A" | "B" | "C" | "D" | "E";

const PILL =
  "rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer";
const PILL_ACTIVE = "border-red-700 bg-red-950 text-red-400";
const PILL_IDLE =
  "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300";

const WEIGHT_OPTIONS: WeightFilter[] = [
  "All",
  "Light",
  "Medium",
  "Heavy",
  "Colossal",
];
const SCALING_OPTIONS: ScalingFilter[] = ["All", "S", "A", "B", "C", "D", "E"];

export interface WeaponFilterProps {
  query: string;
  category: string;
  weightClass: WeightFilter;
  scalingFilter: ScalingFilter;
  minAttack: string;
  /** Derived from loaded weapons — pass all unique categories including "All" */
  categoryOptions: string[];
  onQueryChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onWeightClassChange: (v: WeightFilter) => void;
  onScalingFilterChange: (v: ScalingFilter) => void;
  onMinAttackChange: (v: string) => void;
  onReset: () => void;
}

export function WeaponFilter({
  query,
  category,
  weightClass,
  scalingFilter,
  minAttack,
  categoryOptions,
  onQueryChange,
  onCategoryChange,
  onWeightClassChange,
  onScalingFilterChange,
  onMinAttackChange,
  onReset,
}: WeaponFilterProps) {
  const hasActiveFilters =
    query !== "" ||
    category !== "All" ||
    weightClass !== "All" ||
    scalingFilter !== "All" ||
    minAttack !== "";

  return (
    <div className="space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-500" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, category, or description…"
          className="border-stone-700 bg-stone-900/60 pl-11 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
        />
      </div>

      <div className="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
        {/* Category */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-stone-600 uppercase">
            Category
          </p>
          <div className="flex flex-wrap gap-2">
            {categoryOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onCategoryChange(opt)}
                className={`${PILL} ${category === opt ? PILL_ACTIVE : PILL_IDLE}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-stone-800" />

        {/* Weight Class */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-stone-600 uppercase">
            Weight Class
          </p>
          <div className="flex flex-wrap gap-2">
            {WEIGHT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onWeightClassChange(opt)}
                className={`${PILL} ${weightClass === opt ? PILL_ACTIVE : PILL_IDLE}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-stone-800" />

        {/* Scaling */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-stone-600 uppercase">
            Best Scaling Grade
          </p>
          <div className="flex flex-wrap gap-2">
            {SCALING_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onScalingFilterChange(opt)}
                className={`${PILL} ${scalingFilter === opt ? PILL_ACTIVE : PILL_IDLE}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <Separator className="bg-stone-800" />

        {/* Min Attack */}
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-stone-600 uppercase">
            Min Attack Power
          </p>
          <div className="w-48">
            <Input
              type="number"
              value={minAttack}
              onChange={(e) => onMinAttackChange(e.target.value)}
              placeholder="e.g. 100"
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

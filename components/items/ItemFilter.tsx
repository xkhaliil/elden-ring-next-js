import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Search, X } from "lucide-react";

export type EffectFilter = "All" | "Has Effect" | "No Effect";

const PILL =
  "rounded-sm border px-3 py-1 text-sm transition-all duration-200 cursor-pointer";
const PILL_ACTIVE = "border-red-700 bg-red-950 text-red-400";
const PILL_IDLE =
  "border-stone-800 bg-stone-900/40 text-stone-500 hover:border-stone-600 hover:text-stone-300";

const EFFECT_OPTIONS: EffectFilter[] = ["All", "Has Effect", "No Effect"];

export interface ItemFilterProps {
  query: string;
  typeFilter: string;
  effectFilter: EffectFilter;
  /** Derived from loaded items — pass all unique types including "All" */
  typeOptions: string[];
  onQueryChange: (v: string) => void;
  onTypeFilterChange: (v: string) => void;
  onEffectFilterChange: (v: EffectFilter) => void;
  onReset: () => void;
}

export function ItemFilter({
  query,
  typeFilter,
  effectFilter,
  typeOptions,
  onQueryChange,
  onTypeFilterChange,
  onEffectFilterChange,
  onReset,
}: ItemFilterProps) {
  const hasActiveFilters =
    query !== "" || typeFilter !== "All" || effectFilter !== "All";

  return (
    <div className="space-y-5">
      <div className="relative">
        <Search className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-stone-500" />
        <Input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name, type, or effect…"
          className="border-stone-700 bg-stone-900/60 pl-11 text-stone-200 placeholder:text-stone-600 focus-visible:border-red-700 focus-visible:ring-red-900"
        />
      </div>

      <div className="space-y-4 rounded-sm border border-stone-800/60 bg-stone-900/20 p-4">
        <div className="space-y-2">
          <p className="text-xs tracking-widest text-stone-600 uppercase">
            Type
          </p>
          <div className="flex flex-wrap gap-2">
            {typeOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => onTypeFilterChange(opt)}
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
            {EFFECT_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onEffectFilterChange(opt)}
                className={`${PILL} ${effectFilter === opt ? PILL_ACTIVE : PILL_IDLE}`}
              >
                {opt}
              </button>
            ))}
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

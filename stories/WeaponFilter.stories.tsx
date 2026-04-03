import { useState } from "react";

import {
  WeaponFilter,
  type ScalingFilter,
  type WeightFilter,
} from "@/components/weapons/WeaponFilter";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const ALL_CATEGORIES = [
  "All",
  "Axe",
  "Bow",
  "Colossal Sword",
  "Colossal Weapon",
  "Curved Sword",
  "Dagger",
  "Greataxe",
  "Greatsword",
  "Katana",
  "Spear",
  "Straight Sword",
];

const meta: Meta<typeof WeaponFilter> = {
  title: "Weapons/WeaponFilter",
  component: WeaponFilter,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0804" }],
    },
  },
  decorators: [
    (Story) => (
      <div
        className="dark flex h-screen w-full items-center justify-center bg-[#0a0804]"
        style={{ fontFamily: "'Crimson Text', Georgia, serif" }}
      >
        <div className="w-full max-w-2xl p-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WeaponFilter>;

function InteractiveFilter(
  initial: Partial<{
    query: string;
    category: string;
    weightClass: WeightFilter;
    scalingFilter: ScalingFilter;
    minAttack: string;
    categoryOptions: string[];
  }>,
) {
  const [query, setQuery] = useState(initial.query ?? "");
  const [category, setCategory] = useState(initial.category ?? "All");
  const [weightClass, setWeightClass] = useState<WeightFilter>(
    initial.weightClass ?? "All",
  );
  const [scalingFilter, setScalingFilter] = useState<ScalingFilter>(
    initial.scalingFilter ?? "All",
  );
  const [minAttack, setMinAttack] = useState(initial.minAttack ?? "");

  return (
    <WeaponFilter
      query={query}
      category={category}
      weightClass={weightClass}
      scalingFilter={scalingFilter}
      minAttack={minAttack}
      categoryOptions={initial.categoryOptions ?? ALL_CATEGORIES}
      onQueryChange={setQuery}
      onCategoryChange={setCategory}
      onWeightClassChange={setWeightClass}
      onScalingFilterChange={setScalingFilter}
      onMinAttackChange={setMinAttack}
      onReset={() => {
        setQuery("");
        setCategory("All");
        setWeightClass("All");
        setScalingFilter("All");
        setMinAttack("");
      }}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveFilter />,
};

export const WithSearchQuery: Story = {
  render: () => <InteractiveFilter query="uchigatana" />,
};

export const CategoryPreselected: Story = {
  render: () => <InteractiveFilter category="Katana" />,
};

export const WeightClassPreselected: Story = {
  render: () => <InteractiveFilter weightClass="Heavy" />,
};

export const ScalingPreselected: Story = {
  render: () => <InteractiveFilter scalingFilter="S" />,
};

export const MinAttackSet: Story = {
  render: () => <InteractiveFilter minAttack="150" />,
};

export const AllFiltersActive: Story = {
  render: () => (
    <InteractiveFilter
      query="sword"
      category="Greatsword"
      weightClass="Heavy"
      scalingFilter="A"
      minAttack="120"
    />
  ),
};

export const ClearButtonVisible: Story = {
  name: "Clear All Filters (visible)",
  render: () => <InteractiveFilter scalingFilter="B" />,
};

export const FewCategories: Story = {
  name: "Few Categories (sparse data)",
  render: () => (
    <InteractiveFilter categoryOptions={["All", "Dagger", "Katana"]} />
  ),
};

export const ManyCategories: Story = {
  name: "Many Categories (wrapping pills)",
  render: () => <InteractiveFilter categoryOptions={ALL_CATEGORIES} />,
};

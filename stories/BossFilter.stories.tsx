import { useState } from "react";

import {
  BossFilter,
  type DifficultyFilter,
  type DropsFilter,
} from "@/components/bosses/BossFilter";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof BossFilter> = {
  title: "Bosses/BossFilter",
  component: BossFilter,
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
type Story = StoryObj<typeof BossFilter>;

// Interactive wrapper — Storybook controls won't manage interdependent state well,
// so we use a render function with local state for the realistic stories.
function InteractiveFilter(
  initial: Partial<{
    query: string;
    difficulty: DifficultyFilter;
    dropsFilter: DropsFilter;
    minHp: string;
    maxHp: string;
  }>,
) {
  const [query, setQuery] = useState(initial.query ?? "");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>(
    initial.difficulty ?? "All",
  );
  const [dropsFilter, setDropsFilter] = useState<DropsFilter>(
    initial.dropsFilter ?? "All",
  );
  const [minHp, setMinHp] = useState(initial.minHp ?? "");
  const [maxHp, setMaxHp] = useState(initial.maxHp ?? "");

  return (
    <BossFilter
      query={query}
      difficulty={difficulty}
      dropsFilter={dropsFilter}
      minHp={minHp}
      maxHp={maxHp}
      onQueryChange={setQuery}
      onDifficultyChange={setDifficulty}
      onDropsFilterChange={setDropsFilter}
      onMinHpChange={setMinHp}
      onMaxHpChange={setMaxHp}
      onReset={() => {
        setQuery("");
        setDifficulty("All");
        setDropsFilter("All");
        setMinHp("");
        setMaxHp("");
      }}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveFilter />,
};

export const WithSearchQuery: Story = {
  render: () => <InteractiveFilter query="Margit" />,
};

export const DifficultyPreselected: Story = {
  render: () => <InteractiveFilter difficulty="Extreme" />,
};

export const DropsPreselected: Story = {
  render: () => <InteractiveFilter dropsFilter="Has Drops" />,
};

export const HpRangeSet: Story = {
  render: () => <InteractiveFilter minHp="3000" maxHp="7000" />,
};

export const AllFiltersActive: Story = {
  render: () => (
    <InteractiveFilter
      query="dragon"
      difficulty="Very Hard"
      dropsFilter="Has Drops"
      minHp="5000"
      maxHp="12000"
    />
  ),
};

export const ClearButtonVisible: Story = {
  name: "Clear All Filters (visible)",
  render: () => <InteractiveFilter difficulty="Hard" />,
};

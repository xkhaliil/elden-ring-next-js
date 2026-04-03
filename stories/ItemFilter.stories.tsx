import { useState } from "react";

import { ItemFilter, type EffectFilter } from "@/components/items/ItemFilter";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const ALL_TYPES = [
  "All",
  "Bolstering Material",
  "Consumable",
  "Info Item",
  "Key",
  "Smithing Material",
];

const meta: Meta<typeof ItemFilter> = {
  title: "Items/ItemFilter",
  component: ItemFilter,
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
type Story = StoryObj<typeof ItemFilter>;

function InteractiveFilter(
  initial: Partial<{
    query: string;
    typeFilter: string;
    effectFilter: EffectFilter;
    typeOptions: string[];
  }>,
) {
  const [query, setQuery] = useState(initial.query ?? "");
  const [typeFilter, setTypeFilter] = useState(initial.typeFilter ?? "All");
  const [effectFilter, setEffectFilter] = useState<EffectFilter>(
    initial.effectFilter ?? "All",
  );

  return (
    <ItemFilter
      query={query}
      typeFilter={typeFilter}
      effectFilter={effectFilter}
      typeOptions={initial.typeOptions ?? ALL_TYPES}
      onQueryChange={setQuery}
      onTypeFilterChange={setTypeFilter}
      onEffectFilterChange={setEffectFilter}
      onReset={() => {
        setQuery("");
        setTypeFilter("All");
        setEffectFilter("All");
      }}
    />
  );
}

export const Default: Story = {
  render: () => <InteractiveFilter />,
};

export const WithSearchQuery: Story = {
  render: () => <InteractiveFilter query="flask" />,
};

export const TypePreselected: Story = {
  render: () => <InteractiveFilter typeFilter="Consumable" />,
};

export const EffectPreselected: Story = {
  render: () => <InteractiveFilter effectFilter="Has Effect" />,
};

export const AllFiltersActive: Story = {
  render: () => (
    <InteractiveFilter
      query="golden"
      typeFilter="Bolstering Material"
      effectFilter="Has Effect"
    />
  ),
};

export const ClearButtonVisible: Story = {
  name: "Clear All Filters (visible)",
  render: () => <InteractiveFilter typeFilter="Key" />,
};

export const FewTypeOptions: Story = {
  name: "Few Type Options (sparse data)",
  render: () => (
    <InteractiveFilter typeOptions={["All", "Consumable", "Key"]} />
  ),
};

export const ManyTypeOptions: Story = {
  name: "Many Type Options (wrapping pills)",
  render: () => (
    <InteractiveFilter
      typeOptions={[
        "All",
        "Bolstering Material",
        "Consumable",
        "Crystal",
        "Info Item",
        "Key",
        "Note",
        "Smithing Material",
        "Tool",
        "Whetstone",
      ]}
    />
  ),
};

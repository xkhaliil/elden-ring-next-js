import { ItemCard } from "@/components/items/ItemCard";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof ItemCard> = {
  title: "Items/ItemCard",
  component: ItemCard,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0804" }],
    },
  },
  decorators: [
    (Story) => (
      <div
        className="dark w-72 bg-[#0a0804]"
        style={{ fontFamily: "'Crimson Text', Georgia, serif" }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    item: {
      control: "object",
      description: "The item data object to display on the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ItemCard>;

const base = {
  id: "1",
  name: "Flask of Crimson Tears",
  image:
    "https://eldenring.wiki.fextralife.com/file/Elden-Ring/flask_of_crimson_tears_elden_ring_wiki_guide_200px.png",
  description: "A flask filled with the tears of grace, used to restore HP.",
  type: "Consumable",
  effect:
    "Restores HP. The amount restored depends on the sacred flask's upgrade level.",
};

export const Consumable: Story = {
  args: { item: base },
};

export const KeyItem: Story = {
  args: {
    item: {
      ...base,
      name: "Stonesword Key",
      type: "Key",
      description: "A stone sword that can be used to unseal imp statues.",
      effect: "Breaks the seal of an imp statue.",
    },
  },
};

export const SmithingMaterial: Story = {
  args: {
    item: {
      ...base,
      name: "Smithing Stone [1]",
      type: "Smithing Material",
      description: "A smithing stone used to reinforce armaments.",
      effect: "",
    },
  },
};

export const InfoItem: Story = {
  args: {
    item: {
      ...base,
      name: "Note: Waypoint Ruins",
      type: "Info Item",
      description: "A note scrawled with directions to the Waypoint Ruins.",
      effect: "",
    },
  },
};

export const BolsteringMaterial: Story = {
  args: {
    item: {
      ...base,
      name: "Golden Rune [1]",
      type: "Bolstering Material",
      description: "A golden rune containing residual grace.",
      effect: "Use to gain 200 runes.",
    },
  },
};

export const UnknownType: Story = {
  args: {
    item: {
      ...base,
      name: "Mysterious Artifact",
      type: "Curio",
      description: "Its purpose is unknown.",
      effect: "",
    },
  },
};

export const NoImage: Story = {
  args: {
    item: { ...base, image: "" },
  },
};

export const NoEffect: Story = {
  args: {
    item: {
      ...base,
      name: "Cracked Pot",
      effect: "",
      description:
        "A cracked clay pot. One of several containers for craftable items.",
    },
  },
};

export const LongEffect: Story = {
  name: "Long Effect (expandable)",
  args: {
    item: {
      ...base,
      name: "Preserving Boluses",
      type: "Consumable",
      effect:
        "Alleviates scarlet rot buildup and cures scarlet rot. Crafted by those who made their homes in Caelid, a region tainted by scarlet rot. The antidote they relied upon is now a necessity for any who venture into that blighted land.",
    },
  },
};

export const LongName: Story = {
  args: {
    item: {
      ...base,
      name: "Sacramental Bud of the Haligtree's Inner Sanctum",
      type: "Consumable",
    },
  },
};

export const WithClickHandler: Story = {
  args: {
    item: base,
    onClick: () => alert("Navigating to item detail…"),
  },
};

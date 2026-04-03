import { BossCard } from "@/components/bosses/BossCard";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof BossCard> = {
  title: "Bosses/BossCard",
  component: BossCard,
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
    boss: {
      control: "object",
      description: "The boss data object to display on the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BossCard>;

const base = {
  id: "1",
  name: "Margit, the Fell Omen",
  image:
    "https://eldenring.fanapis.com/images/bosses/17f69a63610l0i1ukyx7xgx6vf0zoa.png",
  description:
    "A powerful demigod who guards the path to Stormveil Castle, wielding both holy and shadow magic.",
  location: "Stormhill, Limgrave",
  drops: ["Talisman Pouch", "5,000 Runes"],
  healthPoints: 3500,
};

export const Hard: Story = {
  args: { boss: base },
};

export const Medium: Story = {
  args: {
    boss: {
      ...base,
      name: "Cemetery Shade",
      healthPoints: 1800,
      drops: ["Deathroot"],
    },
  },
};

export const VeryHard: Story = {
  args: {
    boss: {
      ...base,
      name: "Godrick the Grafted",
      healthPoints: 9800,
      drops: ["Godrick's Great Rune", "Remembrance of the Grafted"],
    },
  },
};

export const Extreme: Story = {
  args: {
    boss: {
      ...base,
      name: "Malenia, Blade of Miquella",
      healthPoints: 33251,
      location: "Elphael, Brace of the Haligtree",
      drops: ["Malenia's Great Rune", "Remembrance of the Rot Goddess"],
    },
  },
};

export const Unknown: Story = {
  args: {
    boss: { ...base, name: "Mysterious Shade", healthPoints: 0, drops: [] },
  },
};

export const NoImage: Story = {
  args: {
    boss: { ...base, image: "", drops: [] },
  },
};

export const NoDrops: Story = {
  args: {
    boss: {
      ...base,
      drops: [],
      description: "A wandering spirit with no known spoils.",
    },
  },
};

export const ManyDrops: Story = {
  args: {
    boss: {
      ...base,
      drops: [
        "Godrick's Great Rune",
        "Remembrance of the Grafted",
        "Golden Seed",
        "Stonesword Key",
      ],
    },
  },
};

export const LongName: Story = {
  args: {
    boss: {
      ...base,
      name: "Dragonlord Placidusax, the Elden Lord of a Previous Age",
      location: "Crumbling Farum Azula",
    },
  },
};

export const WithClickHandler: Story = {
  args: {
    boss: base,
    onClick: () => alert("Navigating to boss detail…"),
  },
};

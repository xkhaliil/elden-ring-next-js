import { WeaponCard } from "@/components/weapons/WeaponCard";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta: Meta<typeof WeaponCard> = {
  title: "Weapons/WeaponCard",
  component: WeaponCard,
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
    weapon: {
      control: "object",
      description: "The weapon data object to display on the card",
    },
  },
};

export default meta;
type Story = StoryObj<typeof WeaponCard>;

const base = {
  id: "1",
  name: "Uchigatana",
  image:
    "https://eldenring.wiki.fextralife.com/file/Elden-Ring/uchigatana_weapon_elden_ring_wiki_guide_200px.png",
  description:
    "A katana with a long single-edged blade. A unique weapon of the Land of Reeds.",
  category: "Katana",
  weight: 5.5,
  attack: [{ name: "Phy", amount: 115 }],
  defence: [{ name: "Phy", amount: 45 }],
  requiredAttributes: [{ name: "Dex", amount: 15 }],
  scalesWith: [{ name: "Dex", scaling: "D" }],
};

export const Medium: Story = {
  args: { weapon: base },
};

export const Light: Story = {
  args: {
    weapon: {
      ...base,
      name: "Reduvia",
      category: "Dagger",
      weight: 2.5,
      attack: [{ name: "Phy", amount: 79 }],
      scalesWith: [{ name: "Arc", scaling: "B" }],
    },
  },
};

export const Heavy: Story = {
  args: {
    weapon: {
      ...base,
      name: "Grafted Blade Greatsword",
      category: "Colossal Sword",
      weight: 21.0,
      attack: [{ name: "Phy", amount: 162 }],
      requiredAttributes: [{ name: "Str", amount: 40 }],
      scalesWith: [{ name: "Str", scaling: "C" }],
    },
  },
};

export const Colossal: Story = {
  args: {
    weapon: {
      ...base,
      name: "Dragon Greatclaw",
      category: "Colossal Weapon",
      weight: 28.0,
      attack: [{ name: "Phy", amount: 155 }],
      requiredAttributes: [{ name: "Str", amount: 48 }],
      scalesWith: [{ name: "Str", scaling: "B" }],
    },
  },
};

export const ScalingS: Story = {
  name: "S-Tier Scaling",
  args: {
    weapon: {
      ...base,
      name: "Rivers of Blood",
      category: "Katana",
      weight: 6.5,
      attack: [{ name: "Phy", amount: 76 }],
      scalesWith: [{ name: "Arc", scaling: "S" }],
    },
  },
};

export const ScalingA: Story = {
  name: "A-Tier Scaling",
  args: {
    weapon: {
      ...base,
      name: "Moonveil",
      scalesWith: [{ name: "Int", scaling: "A" }],
    },
  },
};

export const AllStats: Story = {
  name: "All Stats Populated",
  args: {
    weapon: {
      ...base,
      attack: [{ name: "Phy", amount: 141 }],
      defence: [{ name: "Phy", amount: 52 }],
      requiredAttributes: [{ name: "Str", amount: 16 }],
      scalesWith: [{ name: "Str", scaling: "C" }],
    },
  },
};

export const NoStatsStory: Story = {
  args: {
    weapon: {
      ...base,
      name: "Mysterious Blade",
      attack: [],
      defence: [],
      requiredAttributes: [],
      scalesWith: [],
    },
  },
};

export const NoImage: Story = {
  args: {
    weapon: { ...base, image: "" },
  },
};

export const NoCategory: Story = {
  args: {
    weapon: { ...base, category: "" },
  },
};

export const LongName: Story = {
  args: {
    weapon: {
      ...base,
      name: "Sword of Night and Flame, Blade of the Carian Royal Family",
    },
  },
};

export const WithClickHandler: Story = {
  args: {
    weapon: base,
    onClick: () => alert("Navigating to weapon detail…"),
  },
};

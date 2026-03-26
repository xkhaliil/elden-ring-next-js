import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, within } from "storybook/test";

import { Header } from "./Header";

const meta = {
  title: "Example/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onclicktoBosses: fn(),
    onclicktoWeapons: fn(),
    onclicktoItems: fn(),
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const onclicktoBosses: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const bossesLink = canvas.getByRole("link", { name: /bosses/i });
    bossesLink.addEventListener("click", (e) => e.preventDefault(), {
      once: true,
    });
    bossesLink.click();
    expect(args.onclicktoBosses).toHaveBeenCalled();
  },
};

export const onclicktoWeapons: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const weaponsLink = canvas.getByRole("link", { name: /weapons/i });
    weaponsLink.addEventListener("click", (e) => e.preventDefault(), {
      once: true,
    });
    weaponsLink.click();
    expect(args.onclicktoWeapons).toHaveBeenCalled();
  },
};

export const onclicktoItems: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const itemsLink = canvas.getByRole("link", { name: /items/i });
    itemsLink.addEventListener("click", (e) => e.preventDefault(), {
      once: true,
    });
    itemsLink.click();
    expect(args.onclicktoItems).toHaveBeenCalled();
  },
};

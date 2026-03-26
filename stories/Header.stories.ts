import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn } from "storybook/test";

import { Header } from "./Header";

const meta = {
  title: "Example/Header",
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
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
  play: async ({ args }) => {
    // Simulate a click on the Bosses button
    const bossesButton = document.querySelector(
      'Link[href="/bosses"] div',
    ) as HTMLElement;
    bossesButton.click();

    // Assert that the onclicktoBosses function was called
    expect(args.onclicktoBosses).toHaveBeenCalled();
  },
};
export const onclicktoWeapons: Story = {
  play: async ({ args }) => {
    // Simulate a click on the Weapons button
    const weaponsButton = document.querySelector(
      'Link[href="/weapons"] div',
    ) as HTMLElement;
    weaponsButton.click();

    // Assert that the onclicktoWeapons function was called
    expect(args.onclicktoWeapons).toHaveBeenCalled();
  },
};

export const onclicktoItems: Story = {
  play: async ({ args }) => {
    const itemsButton = document.querySelector(
      'Link[href="/items"] div',
    ) as HTMLElement;
    itemsButton.click();

    expect(args.onclicktoItems).toHaveBeenCalled();
  },
};

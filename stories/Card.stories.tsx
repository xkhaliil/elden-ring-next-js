import React from "react";

import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "2rem",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    buttonLabel: { control: "text" },
    imageSrc: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Bosses: Story = {
  args: {
    title: "Bosses",
    description: "Explore the bosses of Elden Ring",
    buttonLabel: "Search Bosses",
    imageSrc: "/bosses.jpg",
  },
};

export const Weapons: Story = {
  args: {
    title: "Weapons",
    description: "Explore the weapons of Elden Ring",
    buttonLabel: "Search Weapons",
    imageSrc: "/weapons.jpg",
  },
};

export const Items: Story = {
  args: {
    title: "Items",
    description: "Explore the items of Elden Ring",
    buttonLabel: "Search Items",
    imageSrc: "/items.jpg",
  },
};

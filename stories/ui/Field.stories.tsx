import { Field, FieldContent, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Field",
  component: Field,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "radio",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <FieldGroup className="w-[300px]">
      <Field {...args}>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" />
      </Field>
    </FieldGroup>
  ),
};

export const Horizontal: Story = {
  args: {
    orientation: "horizontal",
  },
  render: (args) => (
    <FieldGroup className="w-[350px]">
      <Field {...args}>
        <Label htmlFor="username" className="w-[100px]">
          Username
        </Label>
        <Input id="username" placeholder="johndoe" />
      </Field>
    </FieldGroup>
  ),
};

export const WithDescription: Story = {
  args: {
    orientation: "vertical",
  },
  render: (args) => (
    <FieldGroup className="w-[300px]">
      <Field {...args}>
        <FieldContent>
          <Label htmlFor="password">Password</Label>
          <p className="text-muted-foreground text-xs">
            Must be at least 8 characters long.
          </p>
        </FieldContent>
        <Input id="password" type="password" />
      </Field>
    </FieldGroup>
  ),
};

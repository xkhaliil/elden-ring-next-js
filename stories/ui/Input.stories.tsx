import { Input } from "@/components/ui/input";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "file"],
    },
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "text",
    placeholder: "Enter text here...",
    className: "w-[250px]",
  },
};

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Email address",
    className: "w-[250px]",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Password",
    className: "w-[250px]",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    placeholder: "Disabled input",
    disabled: true,
    className: "w-[250px]",
  },
};

export const File: Story = {
  args: {
    type: "file",
    className: "w-[250px]",
  },
};

export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-[250px] items-center gap-1.5">
      <label htmlFor="email" className="text-sm leading-none font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Email" {...args} />
    </div>
  ),
};

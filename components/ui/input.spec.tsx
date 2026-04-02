import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Input } from "./input";

describe("Input Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders an input HTML element", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input.tagName).toBe("INPUT");
  });

  it("applies the default styling classes", () => {
    render(<Input data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input.className).toContain("h-7");
    expect(input.className).toContain("w-full");
    expect(input.className).toContain("rounded-md");
    expect(input.className).toContain("border-input");
  });

  it("accepts standard HTML attributes like type and placeholder", () => {
    render(
      <Input
        type="password"
        placeholder="Enter password"
        data-testid="input"
      />,
    );
    const input = screen.getByTestId("input");
    expect(input.getAttribute("type")).toBe("password");
    expect(input.getAttribute("placeholder")).toBe("Enter password");
  });

  it("merges custom className with default classes", () => {
    render(<Input className="custom-input" data-testid="input" />);
    const input = screen.getByTestId("input");
    expect(input.className).toContain("custom-input");
    expect(input.className).toContain("border-input");
  });
});

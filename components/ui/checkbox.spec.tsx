import * as React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Checkbox } from "./checkbox";

describe("Checkbox Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders unchecked by default", () => {
    render(<Checkbox data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("false");
    expect(checkbox.getAttribute("data-state")).toBe("unchecked");
  });

  it("renders as checked when the checked prop is true", () => {
    render(<Checkbox checked={true} data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.getAttribute("aria-checked")).toBe("true");
    expect(checkbox.getAttribute("data-state")).toBe("checked");
  });

  it("applies disabled attributes and classes when the disabled prop is true", () => {
    render(<Checkbox disabled={true} data-testid="checkbox" />);
    const checkbox = screen.getByTestId("checkbox");
    expect(checkbox.hasAttribute("disabled")).toBe(true);
    expect(checkbox.className).toContain("disabled:cursor-not-allowed");
    expect(checkbox.className).toContain("disabled:opacity-50");
  });

  it("calls the onCheckedChange handler when clicked", () => {
    const handleCheckedChange = vi.fn();
    render(
      <Checkbox onCheckedChange={handleCheckedChange} data-testid="checkbox" />,
    );
    const checkbox = screen.getByTestId("checkbox");
    fireEvent.click(checkbox);
    expect(handleCheckedChange).toHaveBeenCalledTimes(1);
    expect(handleCheckedChange).toHaveBeenCalledWith(true);
  });
});

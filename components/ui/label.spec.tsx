import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Label } from "./label";

describe("Label Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders its children text", () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText("Test Label")).toBeDefined();
  });

  it("renders as a <label> element by default", () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText("Test Label");
    expect(label.tagName).toBe("LABEL");
  });

  it("accepts the htmlFor attribute", () => {
    render(<Label htmlFor="test-input">Linked Label</Label>);
    const label = screen.getByText("Linked Label");
    expect(label.getAttribute("for")).toBe("test-input");
  });

  it("correctly handles the asChild prop", () => {
    render(
      <Label asChild>
        <span>Span Label</span>
      </Label>,
    );
    const label = screen.getByText("Span Label");
    expect(label.tagName).toBe("SPAN");
  });

  it("merges custom className with default classes", () => {
    render(<Label className="custom-label">Custom Label</Label>);
    const label = screen.getByText("Custom Label");
    expect(label.className).toContain("custom-label");
    expect(label.className).toContain("font-medium");
  });
});

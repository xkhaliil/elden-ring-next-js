import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Badge } from "./badge";

describe("Badge Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders its children text", () => {
    render(<Badge>Test Badge</Badge>);
    expect(screen.getByText("Test Badge")).toBeDefined();
  });

  it("applies the default variant classes", () => {
    render(<Badge>Default</Badge>);
    const badge = screen.getByText("Default");
    expect(badge.className).toContain("bg-primary");
    expect(badge.className).toContain("text-primary-foreground");
  });

  it("correctly applies the destructive variant classes", () => {
    render(<Badge variant="destructive">Destructive</Badge>);
    const badge = screen.getByText("Destructive");
    expect(badge.className).toContain("bg-destructive/10");
    expect(badge.className).toContain("text-destructive");
  });

  it("correctly applies the outline variant classes", () => {
    render(<Badge variant="outline">Outline</Badge>);
    const badge = screen.getByText("Outline");
    expect(badge.className).toContain("border-border");
    expect(badge.className).toContain("bg-input/20");
  });

  it("merges custom className with default classes", () => {
    render(<Badge className="custom-class">Custom</Badge>);
    const badge = screen.getByText("Custom");
    expect(badge.className).toContain("custom-class");
    expect(badge.className).toContain("inline-flex");
  });

  it("renders as a custom element when asChild is true", () => {
    render(
      <Badge asChild>
        <a href="https://example.com">Link Badge</a>
      </Badge>,
    );
    const badge = screen.getByText("Link Badge");
    expect(badge.tagName).toBe("A");
    expect(badge.getAttribute("href")).toBe("https://example.com");
  });
});

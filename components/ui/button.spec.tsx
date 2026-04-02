import * as React from "react";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { Button } from "./button";

describe("Button Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders its children text", () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText("Click Me")).toBeDefined();
  });

  it("applies the default classes", () => {
    render(<Button>Default</Button>);
    const button = screen.getByText("Default");
    expect(button.className).toContain("bg-primary");
    expect(button.className).toContain("text-primary-foreground");
  });

  it("correctly applies the destructive variant classes", () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByText("Destructive");
    expect(button.className).toContain("bg-destructive/10");
    expect(button.className).toContain("text-destructive");
  });

  it("correctly applies the outline variant classes", () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByText("Outline");
    expect(button.className).toContain("border-border");
  });

  it("correctly applies the ghost variant classes", () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByText("Ghost");
    expect(button.className).toContain("hover:bg-muted");
    expect(button.className).toContain("hover:text-foreground");
  });

  it("merges custom className with default classes", () => {
    render(<Button className="custom-btn">Custom</Button>);
    const button = screen.getByText("Custom");
    expect(button.className).toContain("custom-btn");
    expect(button.className).toContain("inline-flex");
  });

  it("handles the asChild prop and renders custom element", () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByText("Link Button");
    expect(link.tagName).toBe("A");
    expect(link.getAttribute("href")).toBe("/test");
  });

  it("triggers the onClick event handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByText("Clickable");
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

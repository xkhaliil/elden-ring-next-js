import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Separator } from "./separator";

describe("Separator Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders correctly with default props (horizontal orientation)", () => {
    render(<Separator data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator.getAttribute("data-orientation")).toBe("horizontal");
    expect(separator.className).toContain("data-horizontal:h-px");
    expect(separator.className).toContain("data-horizontal:w-full");
    expect(separator.className).toContain("bg-border");
  });

  it('renders correctly with orientation="vertical"', () => {
    render(<Separator orientation="vertical" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator.getAttribute("data-orientation")).toBe("vertical");
    expect(separator.className).toContain("data-vertical:w-px");
    expect(separator.className).toContain("data-vertical:self-stretch");
  });

  it("handles the asChild prop correctly without throwing errors", () => {
    render(
      <Separator asChild data-testid="separator">
        <hr />
      </Separator>,
    );
    const separator = screen.getByTestId("separator");
    expect(separator.tagName).toBe("HR");
  });

  it("merges custom className with default classes", () => {
    render(<Separator className="custom-separator" data-testid="separator" />);
    const separator = screen.getByTestId("separator");
    expect(separator.className).toContain("custom-separator");
    expect(separator.className).toContain("bg-border");
  });
});

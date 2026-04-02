import * as React from "react";

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./card";

describe("Card Component", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the full sub-component structure correctly", () => {
    render(
      <Card data-testid="card">
        <CardHeader data-testid="card-header">
          <CardTitle>Test Title</CardTitle>
          <CardDescription>Test Description</CardDescription>
        </CardHeader>
        <CardContent data-testid="card-content">
          <p>Content goes here</p>
        </CardContent>
        <CardFooter data-testid="card-footer">
          <button>Action</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByTestId("card")).toBeDefined();
    expect(screen.getByTestId("card-header")).toBeDefined();
    expect(screen.getByText("Test Title")).toBeDefined();
    expect(screen.getByText("Test Description")).toBeDefined();
    expect(screen.getByTestId("card-content")).toBeDefined();
    expect(screen.getByText("Content goes here")).toBeDefined();
    expect(screen.getByTestId("card-footer")).toBeDefined();
    expect(screen.getByText("Action")).toBeDefined();
  });

  it("applies custom classes to the main Card wrapper and merges with default", () => {
    render(<Card className="custom-card-class" data-testid="card" />);
    const card = screen.getByTestId("card");
    expect(card.className).toContain("custom-card-class");
    expect(card.className).toContain("bg-card");
  });
});

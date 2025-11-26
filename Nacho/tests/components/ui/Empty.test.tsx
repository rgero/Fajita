import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import Empty from "@components/ui/Empty";

describe("Empty component", () => {
  it("renders the image", () => {
    render(<Empty resource="Active Queues" />);
    
    const img = screen.getByRole("img");
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", "fajita.svg");
    expect(img).toHaveAttribute("width", "200");
  });

  it("renders the correct text", () => {
    render(<Empty resource="Active Queues" />);

    expect(
      screen.getByRole("heading", { level: 5 })
    ).toHaveTextContent("No Active Queues found.");
  });

  it("renders different resources dynamically", () => {
    render(<Empty resource="Items" />);

    expect(
      screen.getByRole("heading", { level: 5 })
    ).toHaveTextContent("No Items found.");
  });

  it("renders the grid container", () => {
    const { container } = render(<Empty resource="Stuff" />);

    // One Grid container + two child Grid items
    const grids = container.querySelectorAll(".MuiGrid-root");
    expect(grids.length).toBeGreaterThanOrEqual(3);
  });
});

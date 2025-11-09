import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import MainPage from "@pages/MainPage";

// Mock child components to simplify test
vi.mock("@components/search/SearchHeader", () => ({
  default: () => <div data-testid="search-header" />
}));

vi.mock("@components/search/SearchResults", () => ({
  default: () => <div data-testid="search-results" />
}));

describe("MainPage", () => {
  it("renders SearchHeader and SearchResults", () => {
    render(<MainPage />);

    expect(screen.getByTestId("search-header")).toBeInTheDocument();
    expect(screen.getByTestId("search-results")).toBeInTheDocument();
  });
});

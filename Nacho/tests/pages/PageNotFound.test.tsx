import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import PageNotFound from "@pages/PageNotFound";

describe("PageNotFound", () => {
  it("renders the not found message", () => {
    render(<PageNotFound />);
    expect(screen.getByText(/Page has not been found fool/i)).toBeInTheDocument();
  });
});

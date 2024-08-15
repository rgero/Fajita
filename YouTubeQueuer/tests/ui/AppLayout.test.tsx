import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { describe, expect, it, vi } from "vitest"

import AppLayout from "../../src/components/ui/AppLayout"
import { MemoryRouter } from "react-router-dom"
import React from "react"
import { render } from "@testing-library/react"

// Mock the Footer component
vi.mock("../../src/components/Footer/FooterContainer", () => ({
  __esModule: true,
  default: () => (<div>Mocked Footer</div>),
}))

// Mock the Outlet component
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    Outlet: () => <div>Mocked Outlet</div>,
  }
})

describe("AppLayout", () => {
  it("renders the layout with CssBaseline, Container, Outlet, and Footer", () => {
    const queryClient = new QueryClient()
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AppLayout />
        </MemoryRouter>
      </QueryClientProvider>
    )

    // Check if the mocked Outlet and Footer components are rendered
    expect(getByText("Mocked Outlet")).toBeInTheDocument()
    expect(getByText("Mocked Footer")).toBeInTheDocument()
  })
})

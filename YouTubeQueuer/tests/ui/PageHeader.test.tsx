import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { describe, expect, it, vi } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { useLocation, useNavigate } from "react-router-dom"

import PageHeader from "../../src/components/ui/PageHeader"
import React from "react"
import renderer from 'react-test-renderer';
import { useMediaQuery } from "@mui/material"

// Mocking dependencies
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}))

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual<typeof import("@mui/material")>("@mui/material")
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  }
})

vi.mock("../../src/components/authentication/UserAvatar", () => ({
  __esModule: true,
  default: () => <div>User Avatar</div>,
}))

describe("PageHeader Component", () => {
  it("renders the title correctly", () => {
    
    vi.mocked(useNavigate).mockReturnValue(vi.fn())
    vi.mocked(useLocation).mockReturnValue({ key: "default" } as any)
    vi.mocked(useMediaQuery).mockReturnValue(false)

    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PageHeader title="Test Title" />
      </QueryClientProvider>
    )

    expect(screen.getByText("Test Title")).toBeInTheDocument()
  })

  it("navigates to the home page when location key is 'default'", () => {
    
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useLocation).mockReturnValue({ key: "default" } as any)
    vi.mocked(useMediaQuery).mockReturnValue(false)
    
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PageHeader title="Test Title" />
      </QueryClientProvider>
    )
    fireEvent.click(screen.getByRole("button"))

    
    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("navigates back when location key is not 'default'", () => {
    
    const mockNavigate = vi.fn()
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useLocation).mockReturnValue({ key: "some-key" } as any)
    vi.mocked(useMediaQuery).mockReturnValue(false)
    
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PageHeader title="Test Title" />
      </QueryClientProvider>
    )
    fireEvent.click(screen.getByRole("button"))
    
    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it("renders with smaller icon button and title when media query matches xs screen", () => {
    
    vi.mocked(useNavigate).mockReturnValue(vi.fn())
    vi.mocked(useLocation).mockReturnValue({ key: "default" } as any)
    vi.mocked(useMediaQuery).mockReturnValue(true) // Simulate XS screen
    
    const queryClient = new QueryClient()
    const component = renderer.create(
      <QueryClientProvider client={queryClient}>
        <PageHeader title="Test Title" />
      </QueryClientProvider>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("renders with medium icon button and larger title when media query does not match xs screen", () => {
    
    vi.mocked(useNavigate).mockReturnValue(vi.fn())
    vi.mocked(useLocation).mockReturnValue({ key: "default" } as any)
    vi.mocked(useMediaQuery).mockReturnValue(false) // Simulate non-XS screen
    
    const queryClient = new QueryClient()
    const component = renderer.create(
      <QueryClientProvider client={queryClient}>
        <PageHeader title="Test Title" />
      </QueryClientProvider>
    )
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  })

  it("renders the UserAvatar component", () => {
    
    vi.mocked(useNavigate).mockReturnValue(vi.fn())
    vi.mocked(useLocation).mockReturnValue({ key: "default" } as any)
    vi.mocked(useMediaQuery).mockReturnValue(false)
    
    const queryClient = new QueryClient()
    render(
      <QueryClientProvider client={queryClient}>
        <PageHeader title="Test Title" />
      </QueryClientProvider>
    )
    
    expect(screen.getByText("User Avatar")).toBeInTheDocument()
  })
})

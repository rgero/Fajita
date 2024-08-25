import { describe, expect, it, vi } from "vitest"
import { fireEvent, render } from "@testing-library/react"

import HeaderMenu from "../../src/components/ui/HeaderMenu"
import React from "react"
import { useDarkMode } from "../../src/context/DarkModeContext"
import { useNavigate } from "react-router-dom"
import { useQueueProvider } from "../../src/context/QueueContext"

// Mock necessary dependencies
vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}))
vi.mock("../../src/context/DarkModeContext", () => ({
  useDarkMode: vi.fn(),
}))
vi.mock("../../src/context/QueueContext", () => ({
  useQueueProvider: vi.fn(),
}))
vi.mock("../../src/services/apiAuthentication", () => ({
  deleteAllCookies: vi.fn(),
}))

describe("HeaderMenu", () => {
  it("renders correctly when queue owner exists", () => {
    const mockCloseFn = vi.fn()
    const mockAnchorEl = document.createElement("div")
    const mockQueueOwner = "John Doe"
    
    vi.mocked(useQueueProvider).mockReturnValue({
      getQueueOwner: () => mockQueueOwner,
      connectToQueue: function (id: number): void {
        throw new Error("Function not implemented.")
      },
      getQueueID: function (): number {
        throw new Error("Function not implemented.")
      }
    })
    vi.mocked(useDarkMode).mockReturnValue({
      toggleDarkMode: vi.fn(),
      isDarkMode: false
    })
    
    const { getByText } = render(
      <HeaderMenu anchorEl={mockAnchorEl} closeFn={mockCloseFn} />
    )
    
    expect(getByText(`${mockQueueOwner}'s Queue`)).toBeInTheDocument()
  })

  it("calls navigate to '/queues' when 'Connect to Queue' is clicked", () => {
    const mockCloseFn = vi.fn()
    const mockAnchorEl = document.createElement("div")
    const mockNavigate = vi.fn()
    
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    vi.mocked(useQueueProvider).mockReturnValue({
      getQueueOwner: () => "John Doe",
      connectToQueue: function (id: number): void {
        throw new Error("Function not implemented.")
      },
      getQueueID: function (): number {
        throw new Error("Function not implemented.")
      }
    })
    vi.mocked(useDarkMode).mockReturnValue({
      toggleDarkMode: vi.fn(),
      isDarkMode: false
    })
    
    const { getByText } = render(
      <HeaderMenu anchorEl={mockAnchorEl} closeFn={mockCloseFn} />
    )
    
    fireEvent.click(getByText("Connect to Queue"))
    
    expect(mockNavigate).toHaveBeenCalledWith("/queues")
  })

  it("calls toggleDarkMode when 'Toggle Dark Mode' is clicked", () => {
    const mockCloseFn = vi.fn()
    const mockAnchorEl = document.createElement("div")
    const mockToggleDarkMode = vi.fn()
    
    vi.mocked(useDarkMode).mockReturnValue({
      toggleDarkMode: mockToggleDarkMode,
      isDarkMode: false
    })
    
    const { getByText } = render(
      <HeaderMenu anchorEl={mockAnchorEl} closeFn={mockCloseFn} />
    )
    
    fireEvent.click(getByText("Toggle Dark Mode"))
    
    expect(mockToggleDarkMode).toHaveBeenCalledTimes(1)
  })

  it("navigates to '/feedback' when 'Log Feedback' is clicked", () => {
    const mockCloseFn = vi.fn()
    const mockAnchorEl = document.createElement("div")
    const mockNavigate = vi.fn()
    
    vi.mocked(useNavigate).mockReturnValue(mockNavigate)
    
    const { getByText } = render(
      <HeaderMenu anchorEl={mockAnchorEl} closeFn={mockCloseFn} />
    )
    
    fireEvent.click(getByText("Log Feedback"))
    
    expect(mockNavigate).toHaveBeenCalledWith("/feedback")
  })
})

import { describe, expect, it, vi } from "vitest"

import Modal from "../../src/components/ui/Modal"
import React from "react"
import { render } from "@testing-library/react"
import { useDarkMode } from '../../src/context/DarkModeContext'
import { useTheme } from "@mui/material"

// Mock necessary dependencies
vi.mock('../../src/context/DarkModeContext', () => ({
  useDarkMode: vi.fn(),
}))

vi.mock("@mui/material", async () => {
  const actual = await vi.importActual<typeof import("@mui/material")>("@mui/material")
  return {
    ...actual,
    useTheme: vi.fn(),
  }
})

vi.mock("../../src/utils/HexColorOffset", () => ({
  offsetHexColor: vi.fn(),
}))

describe("Modal Component", () => {
  it("renders children when open is true", () => {
    const mockCloseFn = vi.fn()
    const mockChildren = <div data-testid="modal-content">Modal Content</div>
    vi.mocked(useDarkMode).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: () => {}
    })
    vi.mocked(useTheme).mockReturnValue({
      palette: { background: { paper: "#ffffff" } }
    })

    const { getByTestId } = render(
      <Modal open={true} closeFn={mockCloseFn}>
        {mockChildren}
      </Modal>
    )

    expect(getByTestId("modal-content")).toBeInTheDocument()
  })

  it("does not render children when open is false", () => {
    
    const mockCloseFn = vi.fn()
    const mockChildren = <div data-testid="modal-content">Modal Content</div>
    vi.mocked(useDarkMode).mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: () => {}
    })
    vi.mocked(useTheme).mockReturnValue({
      palette: { background: { paper: "#ffffff" } }
    })

    
    const { queryByTestId } = render(
      <Modal open={false} closeFn={mockCloseFn}>
        {mockChildren}
      </Modal>
    )

    
    expect(queryByTestId("modal-content")).not.toBeInTheDocument()
  })
})

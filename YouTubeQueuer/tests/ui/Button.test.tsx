import { describe, expect, it, vi } from "vitest"
import { fireEvent, render } from "@testing-library/react"

import Button from "../../src/components/ui/Button"
import React from "react"

describe("Button Component", () => {
  it("renders the icon and title", () => {
    
    const mockIcon = <svg data-testid="mock-icon" />
    const mockTitle = "Test Button"
    const mockOnClick = vi.fn()

    
    const { getByText, getByTestId } = render(
      <Button icon={mockIcon} onClick={mockOnClick} title={mockTitle} />
    )

    
    expect(getByTestId("mock-icon")).toBeInTheDocument()
    expect(getByText(mockTitle)).toBeInTheDocument()
  })

  it("calls onClick handler when clicked", () => {
    
    const mockIcon = <svg data-testid="mock-icon" />
    const mockOnClick = vi.fn()

    
    const { getByRole } = render(
      <Button icon={mockIcon} onClick={mockOnClick} title="Click me" />
    )
    const button = getByRole("button")
    
    fireEvent.click(button)

    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it("renders correctly without a title", () => {
    
    const mockIcon = <svg data-testid="mock-icon" />
    const mockOnClick = vi.fn()

    
    const { queryByText } = render(
      <Button icon={mockIcon} onClick={mockOnClick} title={null} />
    )

    
    expect(queryByText("null")).not.toBeInTheDocument()  // Ensures no "null" text is rendered
  })
})

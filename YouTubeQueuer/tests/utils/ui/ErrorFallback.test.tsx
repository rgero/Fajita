import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';

import ErrorFallback from "../../../src/components/ui/ErrorFallback";
import React from "react";

describe("Error Fallback UI Component", () => {
  it('Snapshot should match', () => {
    render(<ErrorFallback/>);

    const acceptedText = "An error has occurred. Probably because you did something weird. Be proud and tell us how you got here."
    const screenText = screen.getByText(acceptedText)
    expect(screenText).toBeVisible();
  })
})

import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';

import PageNotFound from "../../src/pages/PageNotFound";
import React from "react";

describe("PageNotFound Page", () => {  
  it('Text is correct', () => {
    render(<PageNotFound/>);
    const screenElement = screen.getByText("Page has not been found fool.")
    expect(screenElement).toBeVisible();
  })
})

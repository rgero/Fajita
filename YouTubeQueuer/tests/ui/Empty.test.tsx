import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';

import Empty from "../../src/components/ui/Empty";
import React from "react";

describe("Empty UI Component", () => {
  it('Message should be displayed', () => {
    render(<Empty resource={"tests"}/>)

    const expectedText = "No tests found."
    const screenText = screen.getByText(expectedText);
    expect(screenText).toBeVisible();
  })

  it('Image should be displayed', () => {
    render(<Empty resource={"tests"}/>)
    const image = screen.getAllByRole("img");
    expect(image.length).toBe(1);

    const imageName = image[0].getAttribute("src");
    const correctName = "fajita.svg";
    const imageWidth = image[0].getAttribute("width");
    const correctWidth = "200";

    expect(imageName).toBe(correctName);
    expect(imageWidth).toBe(correctWidth);
  })
})

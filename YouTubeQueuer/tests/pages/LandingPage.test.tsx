import { describe, expect, it } from "vitest";
import { render, screen } from '@testing-library/react';

import LandingPage from "../../src/pages/LandingPage";
import React from "react";

describe("Landing Page", () => {
  it('Icon is there', () => {
    render(<LandingPage/>);

    const screenElement = screen.getAllByRole("img")
    expect(screenElement.length).toBe(1);
  })

  
  it('Icon is correct', () => {
    render(<LandingPage/>);
    
    const screenElement = screen.getAllByRole("img")

    const imageName = screenElement[0].getAttribute("src");
    const correctName = "fajita.svg";
    const imageWidth = screenElement[0].getAttribute("width");
    const correctWidth = "200";

    expect(imageName).toBe(correctName);
    expect(imageWidth).toBe(correctWidth);
  })

  it('Text is correct', () => {
    render(<LandingPage/>);
    const screenElement = screen.getByText("Hi, welcome to Fajita")
    expect(screenElement).toBeVisible();
  })
})

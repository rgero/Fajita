import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import FooterDrawer from "@components/footer/FooterDrawer";

// Mock all option subcomponents
vi.mock("@components/footer/DrawerOptions/AddToStash", () => ({
  default: () => <div>AddToStashOption</div>,
}));

vi.mock("@components/footer/DrawerOptions/OpenStashOption", () => ({
  default: () => <div>OpenStashOption</div>,
}));

vi.mock("@components/footer/DrawerOptions/PlayOption", () => ({
  default: () => <div>PlayOption</div>,
}));

vi.mock("@components/footer/DrawerOptions/QueueOption", () => ({
  default: () => <div>QueueOption</div>,
}));

vi.mock("@components/footer/DrawerOptions/SkipOption", () => ({
  default: () => <div>SkipOption</div>,
}));

vi.mock("@components/footer/DrawerOptions/ShareOption", () => ({
  default: () => <div>ShareOption</div>,
}));

describe("FooterDrawer", () => {
  const handlerFalse = vi.fn();
  const handlerTrue = vi.fn();

  // toggleDrawer returns event handlers
  const toggleDrawerMock = vi.fn((open: boolean) =>
    open ? handlerTrue : handlerFalse
  );

  it("renders when open", () => {
    render(<FooterDrawer isOpen={true} toggleDrawer={toggleDrawerMock} />);

    expect(screen.getByText("PlayOption")).toBeInTheDocument();
    expect(screen.getByText("SkipOption")).toBeInTheDocument();
    expect(screen.getByText("ShareOption")).toBeInTheDocument();
    expect(screen.getByText("AddToStashOption")).toBeInTheDocument();
    expect(screen.getByText("OpenStashOption")).toBeInTheDocument();
    expect(screen.getByText("QueueOption")).toBeInTheDocument();
  });

  it("calls toggleDrawer(true) when drawer onOpen triggers", () => {
    render(<FooterDrawer isOpen={true} toggleDrawer={toggleDrawerMock} />);

    // MUI SwipeableDrawer calls onOpen when it receives an "open" event
    const outerDrawer = screen.getAllByRole("presentation")[0];

    outerDrawer.dispatchEvent(new Event("open", { bubbles: true }));

    expect(toggleDrawerMock).toHaveBeenCalledWith(true);
  });

  it("calls toggleDrawer(false) when drawer onClose triggers", () => {
    render(<FooterDrawer isOpen={true} toggleDrawer={toggleDrawerMock} />);

    const outerDrawer = screen.getAllByRole("presentation")[0];

    outerDrawer.dispatchEvent(new Event("close", { bubbles: true }));

    expect(toggleDrawerMock).toHaveBeenCalledWith(false);
  });

  it("clicking inside triggers toggleDrawer(false)", () => {
    render(<FooterDrawer isOpen={true} toggleDrawer={toggleDrawerMock} />);

    const content = screen.getByTestId("footer-drawer-content");

    fireEvent.click(content);

    expect(toggleDrawerMock).toHaveBeenCalledWith(false);
    expect(handlerFalse).toHaveBeenCalled();
  });

  it("pressing key inside triggers toggleDrawer(false)", () => {
    render(<FooterDrawer isOpen={true} toggleDrawer={toggleDrawerMock} />);

    const content = screen.getByTestId("footer-drawer-content");

    fireEvent.keyDown(content, { key: "Escape" });

    expect(toggleDrawerMock).toHaveBeenCalledWith(false);
    expect(handlerFalse).toHaveBeenCalled();
  });
});

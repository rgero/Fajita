import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import UserAvatar from '@components/ui/UserAvatar';
import { useAuth } from '@context/authentication/AuthenticationContext';

vi.mock('@context/authentication/AuthenticationContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@components/header/HeaderMenu', () => ({
  default: ({ anchorEl, closeFn }: { anchorEl: HTMLElement | null; closeFn: () => void }) => (
    <div>
      <div data-testid="header-menu">{anchorEl ? 'Menu Open' : 'Menu Closed'}</div>
      <button onClick={closeFn}>Close Menu</button>
    </div>
  ),
}));

describe('UserAvatar', () => {
  const mockUser = { picture: 'user-pic.jpg' };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders avatar with user picture', () => {
    (useAuth as any).mockReturnValue({ user: mockUser });
    render(<UserAvatar />);

    const avatar = screen.getByRole('img');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'user-pic.jpg');
  });

  it('renders avatar with default picture if no user picture', () => {
    (useAuth as any).mockReturnValue({ user: {} });
    render(<UserAvatar />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', 'default-user.jpg');
  });

  it('renders avatar with default picture when user is null', () => {
    (useAuth as any).mockReturnValue({ user: null });
    render(<UserAvatar />);

    const avatar = screen.getByRole('img');
    expect(avatar).toHaveAttribute('src', 'default-user.jpg');
  });

  it('opens HeaderMenu when avatar is clicked', () => {
    (useAuth as any).mockReturnValue({ user: mockUser });
    render(<UserAvatar />);

    const avatar = screen.getByRole('img');
    fireEvent.click(avatar);

    const menu = screen.getByTestId('header-menu');
    expect(menu).toHaveTextContent('Menu Open');
  });

  it('closes HeaderMenu when handleClose is called', () => {
    (useAuth as any).mockReturnValue({ user: mockUser });
    render(<UserAvatar />);

    const avatar = screen.getByRole('img');
    fireEvent.click(avatar);
    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));

    const menu = screen.getByTestId('header-menu');
    expect(menu).toHaveTextContent('Menu Closed');
  });
});

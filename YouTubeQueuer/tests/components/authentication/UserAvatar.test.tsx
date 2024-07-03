import { describe, it, vi } from 'vitest';

import React from "react";
import UserAvatar from '../../../src/components/authentication/UserAvatar';
import renderer from 'react-test-renderer';
import {useUser} from '../../../src/components/authentication/hooks/useUser';

// Mock the custom hook
vi.mock('../../../src/components/authentication/hooks/useUser');

vi.mock('react-router-dom', () => ({
  useNavigate: () => () => {},
}));

const testData = {
  email: "roy@roy.com",
  id: 1,
  name: "Roy"
}

describe('UserAvatar Tests', () => {
  it('renders data returned by useCustomHook', () => 
  {
    // Provide a mock implementation for the hook
    (useUser as jest.Mock).mockReturnValue(testData);

    const component = renderer.create(<UserAvatar/>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
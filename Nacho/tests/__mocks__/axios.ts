// __mocks__/axios.ts

import { vi } from 'vitest';

const axios = {
  get: vi.fn(() => Promise.resolve({ data: {} })),
  post: vi.fn(() => Promise.resolve({ data: {} })),
  // Add other methods you need
};

export default axios;
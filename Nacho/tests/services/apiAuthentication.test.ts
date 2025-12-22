import { beforeEach, describe, expect, it, vi } from 'vitest';
import { deleteAllCookies, getCurrentUser } from '@services/apiAuthentication'; // adjust path

import { fajitaAxios } from "@services/axios";

vi.mock("@services/axios", () => ({
  fajitaAxios: {
    get: vi.fn(),
  },
}));

describe('apiFajita Utils', () => {
  
  describe('deleteAllCookies', () => {
    beforeEach(() => {
      // Clear cookies before each test
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    });

    it('should clear all existing cookies', () => {
      // Set some initial cookies
      document.cookie = "session=123";
      document.cookie = "user=john";
      
      expect(document.cookie).toContain("session=123");
      expect(document.cookie).toContain("user=john");

      deleteAllCookies();

      // Cookies should now be empty (or expired)
      expect(document.cookie).toBe("");
    });
  });

  describe('getCurrentUser', () => {
    const mockUser = { id: 1, name: 'Gemini', email: 'test@example.com' };

    beforeEach(() => {
      vi.clearAllMocks();
      vi.stubEnv('VITE_BACKEND_URL', 'http://api.test');
    });

    it('should return data when response is 200', async () => {
      // Mock a successful axios response
      vi.mocked(fajitaAxios.get).mockResolvedValue({
        status: 200,
        data: mockUser,
      });

      const result = await getCurrentUser();

      expect(fajitaAxios.get).toHaveBeenCalledWith('http://api.test/get_user_info');
      expect(result).toEqual(mockUser);
    });

    it('should return undefined and log error on failure', async () => {
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      const error = new Error('Network Error');
      
      vi.mocked(fajitaAxios.get).mockRejectedValue(error);

      const result = await getCurrentUser();

      expect(result).toBeUndefined();
      expect(consoleSpy).toHaveBeenCalledWith(error);
      
      consoleSpy.mockRestore();
    });

    it('should return undefined if status is not 200', async () => {
      vi.mocked(fajitaAxios.get).mockResolvedValue({
        status: 401,
        data: { message: 'Unauthorized' },
      });

      const result = await getCurrentUser();

      expect(result).toBeUndefined();
    });
  });
});
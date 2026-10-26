import { fajitaAxios } from "./axios";
import { User } from "@interfaces/User";

export const getCurrentUser = async (): Promise<User> => {
  const response = await fajitaAxios.get<User>(`${import.meta.env.VITE_BACKEND_URL}/api/me`);
  if (response.status !== 200 || !response.data) {
    throw new Error("Failed to get current user");
  }
  return response.data;
}
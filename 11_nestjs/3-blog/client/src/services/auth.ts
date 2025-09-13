import type { LoginValues, MessageResponse, RegisterValues, UpdateProfileValues, User } from "../types";
import api from "./axios";

const authService = {
  login: async (values: LoginValues) => {
    const res = await api.post<User>("/auth/login", values);
    return res.data;
  },

  register: async (values: RegisterValues) => {
    const res = await api.post<User>("auth/register", values);
    return res?.data;
  },

  logout: async () => {
    const res = await api.post<MessageResponse>("auth/logout");
    return res.data;
  },

  refreshToken: async () => {
    const res = await api.post<MessageResponse>("auth/refresh-token");
    return res.data;
  },

  getProfile: async () => {
    const res = await api.get<User>("user/me");
    return res.data;
  },

  updateProfile: async (values: UpdateProfileValues) => {
    const res = await api.patch<User>("user/me", values);
    return res.data;
  },
};

export default authService;

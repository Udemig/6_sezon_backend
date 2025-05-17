import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { AuthResponse, ILoginData, IRegisterData } from "../types";
import api from "./axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const authService = {
  login: (body: ILoginData) => api.post<AuthResponse>("/auth/login", body),
  register: (body: IRegisterData) =>
    api.post<AuthResponse>("/auth/register", body, { headers: { "Content-Type": "multipart/form-data" } }),
  logout: () => api.post("/auth/logout"),
  profile: () => api.get<AuthResponse>("/auth/profile"),
};

// login istekleri için kullancaığımız mutasyon
export const useLogin = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["login"],
    mutationFn: authService.login,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["profile"] });
      navigate("/");
      toast.success("Oturumunuz açıldı.");
    },
    onError: () => {
      toast.error("Giriş yapma işleminde bir hata oluştu");
    },
  });
};

// register istekleri için kullancaığımız mutasyon
export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["register"],
    mutationFn: authService.register,
    onSuccess: () => {
      navigate("/login");
      toast.success("Hesabınız oluşturuldu. Giriş yapabilirsiniz.");
    },
    onError: () => {
      toast.error("Kaydolma işleminde bir hata oluştu");
    },
  });
};

// logout istekleri için kullancaığımız mutasyon
export const useLogout = () => {
  const navigate = useNavigate();
  const client = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: authService.logout,
    onSuccess: () => {
      const resetQueriesToUndefined = () => {
        client
          .getQueryCache()
          .findAll({ queryKey: ["profile"] })
          .forEach((query) => query.setData(undefined));
        client.invalidateQueries({ queryKey: ["profile"] });
      };
      resetQueriesToUndefined();

      navigate("/login");
      toast.success("Oturumunuz kapandı");
    },
    onError: () => {
      toast.error("Çıkıi yapma işleminde bir hata oluştu");
    },
  });
};

// profile isteği için kullanıcağımız query
export const useProfile = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["profile"],
    queryFn: authService.profile,
    staleTime: 0,
    select: (res) => res.data.user,
    retry: false,
  });

  return { isLoading, error, user: data };
};

import { createContext, useContext, useEffect, useState, type FC, type ReactNode } from "react";
import type { LoginValues, RegisterValues, User } from "../types";
import authService from "../services/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Context Types
interface IAuthContext {
  loading: boolean;
  user: User | null | undefined;
  register: (values: RegisterValues) => Promise<void>;
  login: (values: LoginValues) => Promise<void>;
  logout: () => Promise<void>;
}

// Context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Context Provider
const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null | undefined>(undefined);

  // her sayfa yüklendeiğinde kullanıcı verisini api'dan al
  useEffect(() => {
    // eğer kullanıcı giriş yapmamışsa fonksiyonu durdur
    if (localStorage.getItem("isLoggedIn") !== "true") return setUser(null);

    const getUser = async () => {
      setLoading(true);

      try {
        const user = await authService.getProfile();
        setUser(user);
      } catch (error) {
        setUser(null);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const register = async (values: RegisterValues) => {
    setLoading(true);

    try {
      await authService.register(values);
      toast.success("Kullanıcı başarıyla oluşturuldu. Giriş yapınız.");
      navigate("/login");
    } catch (error: any) {
      setUser(null);
      toast.error(error?.response?.data?.message || "Kullanıcı oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (values: LoginValues) => {
    setLoading(true);

    try {
      const user = await authService.login(values);
      setUser(user);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
      toast.success("Giriş başarılı");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Giriş başarısız");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
      toast.success("Çıkış yapıldı");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Çıkış yapıldı");
    }
  };

  return <AuthContext.Provider value={{ loading, user, register, login, logout }}>{children}</AuthContext.Provider>;
};

// context hook
const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth AuthProvider'ın içinde kullanılmalıdır.");
  }

  return context;
};

export { AuthContext, AuthProvider, useAuth };

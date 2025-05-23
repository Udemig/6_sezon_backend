import type { JSX } from "react";
import type { IconType } from "react-icons/lib";

interface ILoginData {
  username: string;
  password: string;
}

interface IRegisterData {
  username: string;
  email: string;
  profilePicture: File;
  country: string;
  password: string;
  isSeller: boolean;
  phone?: string;
  description?: string;
}

interface IUser {
  username: string;
  email: string;
  country: string;
  profilePicture: string;
  isSeller: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface AuthResponse {
  message: string;
  user: IUser;
}

interface ICategory {
  name: string;
  icon: JSX.Element;
}
interface IInfo {
  title: string;
  text: string;
}
interface IInput {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  multiple?: boolean;
  min?: number;
  max?: number;
}

export type { ILoginData, IRegisterData, IUser, AuthResponse, ICategory, IInfo, IInput };

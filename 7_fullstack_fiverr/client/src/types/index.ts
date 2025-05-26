import type { AxiosError } from "axios";
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
  description?: string;
  phone?: string;
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

// Gig Verileri İçin
interface IGig<T> {
  _id: string;
  user: T;
  title: string;
  description: string;
  reviewCount: number;
  starCount: number;
  category: string;
  coverImage: string;
  images: string[];
  packageTitle: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: string[];
  packageDuration: number;
  packageRevisions: number;
  createdAt: string;
  updatedAt: number;
  __v: 0;
}

interface ShortUser {
  username: string;
  profilePicture: string;
  id: string;
}

interface GetAllGigsResponse {
  message: string;
  results: number;
  gigs: IGig<ShortUser>[];
}
interface GetOneGigResponse {
  message: string;
  gig: IGig<IUser>;
}

interface GigFormData {}

interface GetAllGigsParams {
  category?: string | null;
  search?: string | null;
  userId?: string;
}

interface Err extends AxiosError<{ message: string }> {}

export type {
  ILoginData,
  IRegisterData,
  IUser,
  AuthResponse,
  ICategory,
  IInfo,
  IInput,
  IGig,
  ShortUser,
  GetAllGigsResponse,
  GetOneGigResponse,
  GetAllGigsParams,
  GigFormData,
  Err,
};

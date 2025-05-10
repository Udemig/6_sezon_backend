import { Request } from "express";

interface RegisterBody {
  username: string;
  email: string;
  password: string;
  country: string;
  isSeller?: boolean;
  profilePicture?: string;
  phone?: string;
  description?: string;
}

interface LoginBody {
  username: string;
  password: string;
}

type RegisterReq = Request<{}, {}, RegisterBody>;

type LoginReq = Request<{}, {}, LoginBody>;

export { RegisterReq, LoginReq };

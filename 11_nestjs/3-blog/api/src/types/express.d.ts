declare global {
  namespace Express {
    interface User {
      _id: string;
      username: string;
      email: string;
      password: string;
    }
  }

  interface Request {
    cookies: {
      access_token?: string;
      refresh_token?: string;
    };
  }
}

export {};

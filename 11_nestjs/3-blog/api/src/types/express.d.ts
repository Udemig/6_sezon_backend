import { UserDocument } from 'src/user/schemas/user.schema';
import { UserType } from '.';

declare global {
  namespace Express {
    // interface User {
    //   _id: string;
    //   username: string;
    //   email: string;
    //   password: string;
    // }

    interface User extends UserType {}
  }

  interface Request {
    cookies: {
      access_token?: string;
      refresh_token?: string;
    };
  }
}

export {};

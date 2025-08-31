interface RegisterValues {
  username: string;
  email: string;
  password: string;
}

interface LoginValues {
  username: string;
  password: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface MessageResponse {
  message: string;
}

interface UpdateProfileValues {
  username: string;
  email: string;
  password: string;
}

export type { RegisterValues, LoginValues, User, MessageResponse, UpdateProfileValues };

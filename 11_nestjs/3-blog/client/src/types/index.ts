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
  id: string;
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

interface Blog {
  id: string;
  title: string;
  content: string;
  tags: string[];
  commentCount: number;
  author: {
    id: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface GetBlogResponse {
  total: number;
  pages: number;
  blogs: Blog[];
}

interface GetBlogParams {
  limit?: number;
  page?: number;
}

interface CreateBlogValues {
  title: string;
  content: string;
  tags: string[];
}

interface Comment {
  content: string;
  blog: string;
  user: {
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    id: string;
  };
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type {
  RegisterValues,
  LoginValues,
  User,
  MessageResponse,
  UpdateProfileValues,
  Blog,
  GetBlogResponse,
  GetBlogParams,
  CreateBlogValues,
  Comment,
};

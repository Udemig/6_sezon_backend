import type { Blog, CreateBlogValues, GetBlogParams, GetBlogResponse } from "../types";
import api from "./axios";

const blogService = {
  getAll: async (params?: GetBlogParams) => {
    const res = await api.get<GetBlogResponse>("/blog", { params });
    return res.data;
  },

  getOwn: async (params?: GetBlogParams) => {
    const res = await api.get<GetBlogResponse>("/blog/own", { params });
    return res.data;
  },

  create: async (values: CreateBlogValues) => {
    const res = await api.post<Blog>("/blog", values);

    return res.data;
  },

  getById: async (id: string) => {
    const res = await api.get<Blog>(`/blog/${id}`);

    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete<Blog>(`/blog/${id}`);

    return res.data;
  },

  update: async (id: string, values: Partial<CreateBlogValues>) => {
    const res = await api.patch<Blog>(`/blog/${id}`, values);

    return res.data;
  },
};

export default blogService;

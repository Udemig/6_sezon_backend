import type { Comment } from "../types";
import api from "./axios";

const commentService = {
  getAll: async (blogId: string) => {
    const res = await api.get<Comment[]>(`blog/${blogId}/comments`);
    return res.data;
  },

  create: async (blogId: string, content: string) => {
    const res = await api.post<Comment>(`blog/${blogId}/comments`, { content });
    return res.data;
  },

  delete: async (blogId: string, commentId: string) => {
    const res = await api.delete<Comment>(`blog/${blogId}/comments/${commentId}`);
    return res.data;
  },
};

export default commentService;

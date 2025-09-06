import { useQuery } from "@tanstack/react-query";
import blogService from "../services/blog";
import type { GetBlogParams } from "../types";

const useBlogs = (params?: GetBlogParams) =>
  useQuery({
    queryKey: ["blogs", params],
    queryFn: () => blogService.getAll(params),
  });

const useBlog = (id: string) =>
  useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getById(id),
  });

export { useBlogs, useBlog };

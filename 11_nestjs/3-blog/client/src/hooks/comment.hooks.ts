import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import commentService from "../services/comment";
import { toast } from "react-toastify";

const useComments = (blogId: string) =>
  useQuery({
    queryKey: ["comments", blogId],
    queryFn: () => commentService.getAll(blogId),
    enabled: !!blogId, // blogId varsa sorgu çalıştır
  });

const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ blogId, content }: { blogId: string; content: string }) => {
      console.log(blogId, content);
      return commentService.create(blogId, content);
    },
    // istek başarılı olunca comments sorgusunu tekrar çalıştır
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
    onError: () => toast.error("Yorum oluşturulamadı"),
  });
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogId, commentId }: { blogId: string; commentId: string }) =>
      commentService.delete(blogId, commentId),
    // istek başarılı olunca comments sorgusunu tekrar çalıştır
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["comments"] }),
    onError: () => toast.error("Yorum silinemedi"),
  });
};

export { useComments, useCreateComment, useDeleteComment };

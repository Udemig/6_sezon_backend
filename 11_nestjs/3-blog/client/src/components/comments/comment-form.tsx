import { toast } from "react-toastify";
import { useAuth } from "../../context/auth-context";
import { useCreateComment } from "../../hooks/comment.hooks";
import { useParams } from "react-router-dom";

const CommentForm = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { mutate, isPending } = useCreateComment();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = e.currentTarget.text.value.trim();

    if (!text) return toast.warning("Yorum boş bırakılamaz");

    mutate({ blogId: id!, content: text });

    toast.success("Yorum başarıyla oluşturuldu");

    e.currentTarget.reset();
  };

  return (
    <form className="flex items-center gap-2 mt-5" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        disabled={!user}
        title={!user ? "Yorum atmak için giriş yapınız" : "Yorumunuzu gönderin"}
        className="flex-1 border border-dark-20 rounded-md py-2 px-4 focus:border-white/70 outline-none disabled:bg-zinc-900 disabled:cursor-not-allowed"
        placeholder="Yorumunuzu giriniz..."
      />

      <button
        title={!user ? "Yorum atmak için giriş yapınız" : "Yorumunuzu gönderin"}
        disabled={!user || isPending}
        className="bg-yellow-55 text-white text-shadow-black/40 text-shadow-md px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-55/60 transition-colors disabled:cursor-not-allowed disabled:brightness-75"
      >
        Gönder
      </button>
    </form>
  );
};

export default CommentForm;

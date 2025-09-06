const CommentForm = () => {
  return (
    <form className="flex items-center gap-2 mt-5">
      <input
        type="text"
        className="flex-1 border border-dark-20 rounded-md py-2 px-4 focus:border-white/70 outline-none"
        placeholder="Yorumunuzu giriniz..."
      />

      <button className="bg-yellow-55 text-white text-shadow-black/40 text-shadow-md px-4 py-2 rounded-md cursor-pointer hover:bg-yellow-55/60 transition-colors">
        Gönder
      </button>
    </form>
  );
};

export default CommentForm;

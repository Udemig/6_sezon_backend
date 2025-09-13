import { Link, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { mdeOptions, reactSelectOptions } from "../../utils/constants";
import ReactSelect from "react-select/creatable";
import { useEffect, useState } from "react";
import { useBlog, useCreateBlog, useUpdateBlog } from "../../hooks/blog.hooks";
import PageLoader from "../../components/loader/page-loader";

const BlogForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const { data: blogData, isLoading: blogLoading } = useBlog(id!);
  const { mutate: createMutate, isPending: createPending } = useCreateBlog();
  const { mutate: updateMutate, isPending: updatePending } = useUpdateBlog();

  // form değerleri
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  // sayfa yüklendiğinde form state'lerini güncelle
  useEffect(() => {
    setTitle(blogData?.title || "");
    setContent(blogData?.content || "");
    setTags(blogData?.tags || []);
  }, [blogData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isEditMode) {
      createMutate({ title, content, tags });
    } else {
      updateMutate({ id: id!, values: { title, content, tags } });
    }
  };

  if (blogLoading) return <PageLoader />;

  return (
    <div className="max-w-3xl mx-auto padding-x py-10">
      <h1 className="text-3xl font-bold text-zinc-400 mb-8">{isEditMode ? "Blog Düzenle" : "Blog Oluştur"}</h1>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <div className="group">
          <label htmlFor="title" className="label">
            Başlık
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="input"
            placeholder="Başlık giriniz..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="group">
          <label htmlFor="content" className="label">
            İçerik
          </label>

          <SimpleMDE className="prose" options={mdeOptions} value={content} onChange={(value) => setContent(value)} />
        </div>

        <div className="group">
          <label htmlFor="tags">Etiketler</label>

          <ReactSelect
            isMulti
            styles={reactSelectOptions}
            placeholder="Etiketleri seçiniz..."
            value={tags.map((tag) => ({ value: tag, label: tag }))}
            onChange={(tags) => setTags(tags.map((tag) => tag.value))}
          />
        </div>

        <div className="flex justify-end mt-5 gap-5">
          <Link
            to={-1 as any}
            className="bg-zinc-700 text-white px-4 py-2 rounded-md hover:bg-zinc-600 transition cursor-pointer"
          >
            Geri
          </Link>
          <button
            disabled={createPending || updatePending}
            type="submit"
            className="bg-yellow-55 text-black px-4 py-2 rounded-md hover:bg-yellow-60 transition cursor-pointer"
          >
            {isEditMode ? "Güncelle" : "Oluştur"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;

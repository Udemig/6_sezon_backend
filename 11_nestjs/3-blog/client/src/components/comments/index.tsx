import CommentForm from "./comment-form";
import CommentList from "./comment-list";

const Comments = () => {
  return (
    <div className="padding-x py-5 pb-10">
      <CommentForm />

      <CommentList />
    </div>
  );
};

export default Comments;

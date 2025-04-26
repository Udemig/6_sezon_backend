import { FaTrash } from "react-icons/fa";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DeleteButton = ({ id }) => {
  const navigate = useNavigate();

  //filmi silmek için  api isteği at
  const handleDelete = () => {
    api
      .delete(`/api/movies/${id}`)
      .then(() => {
        toast.warning("Film Kaldırıldı");
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white p-2 rounded-md hover:bg-red-400"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteButton;

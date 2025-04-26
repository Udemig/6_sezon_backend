import { useMutation } from "@tanstack/react-query";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTrashAlt } from "react-icons/fa";
import { LoaderSm } from "./Loader";

const DeleteButton = ({ productId }) => {
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: () => api.delete(`api/v1/recipes/${productId}`),

    onSuccess: () => {
      navigate("/");
      toast.success("Tarif Kaldırıldı");
    },

    onError: () => {
      toast.error("İşlem başarısız");
    },
  });

  return (
    <button
      disabled={isLoading}
      onClick={mutate}
      className="btn flex gap-2 items-center bg-red-500 hover:bg-red-600 py-1 min-w-[80px]"
    >
      {isLoading ? (
        <LoaderSm />
      ) : (
        <>
          <FaTrashAlt />
          Sil
        </>
      )}
    </button>
  );
};

export default DeleteButton;

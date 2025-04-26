import { useNavigate } from "react-router-dom";
import api from "../api";
import Form from "../components/Form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Create = () => {
  const navigate = useNavigate();
  // api isteği
  const { isLoading, mutate } = useMutation({
    mutationFn: (newRecipe) => api.post("/api/v1/recipes", newRecipe),

    onSuccess: () => {
      toast.success("Yeni Tarif Oluşururldu");
      navigate("/");
    },

    onError: () => {
      toast.error("Bir sorun oluştu");
    },
  });

  return (
    <div>
      <h1>Yeni Tarif Oluştur</h1>

      <Form isLoading={isLoading} mutate={mutate} />
    </div>
  );
};

export default Create;

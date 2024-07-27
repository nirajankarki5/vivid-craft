import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavourite } from "../services/apiImages";
import toast from "react-hot-toast";
import { getToken } from "../utils/auth";

const useAddToFav = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (a: { imageId: string | undefined; method: string }) =>
      addToFavourite({
        method: a.method,
        imageId: a.imageId,
        token: getToken(),
      }),
    onSuccess: (data) => {
      toast.success(
        data.method === "POST"
          ? "Image added to favourites"
          : "Image removed from favourites",
      );
      //   update number count by invalidating query in both image detail page and image grid
      queryClient.invalidateQueries({ queryKey: ["image"] });
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { mutation };
};

export default useAddToFav;

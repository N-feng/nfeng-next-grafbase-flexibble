
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { useParams } from "next/navigation";
import { FormValues } from "@/features/profiles/components/profile-form";

export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  
  const storeId = params.storeId;

  const mutation = useMutation<any, Error, FormValues>({
    mutationFn: async (json) => {
      console.log('get json when update profile: ', json);
      // const response = await client.api.categories[":id"]["$patch"]({
      //   param: { id },
      //   json,
      // });
      const {data} = await axios.post(`/api/profile/`, json);
      console.log('update profile data: ', data);
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated");
      // queryClient.invalidateQueries({ queryKey: ["category", id] });
      // queryClient.invalidateQueries({ queryKey: ["categories"] });
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  return mutation;
};

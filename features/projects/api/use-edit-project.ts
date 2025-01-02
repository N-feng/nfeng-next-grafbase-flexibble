
import { toast } from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import axios from "axios";
import { useParams } from "next/navigation";
import { FormValues } from "@/features/projects/components/project-form";

export const useEditProject = (projectId: string) => {
  const queryClient = useQueryClient();
  const params = useParams();
  
  // const projectId = params.projectId;

  const mutation = useMutation<any, Error, FormValues>({
    mutationFn: async (json) => {
      const {data} = await axios.patch(`/api/projects/${projectId}`, json);
      return data;
    },
    onSuccess: () => {
      toast.success("Project updated");
      // queryClient.invalidateQueries({ queryKey: ["category", id] });
      // queryClient.invalidateQueries({ queryKey: ["categories"] });
      // queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to update project");
    },
  });

  return mutation;
};

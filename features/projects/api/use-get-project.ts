import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProject = () => {
  const params = useParams();

  const projectId = params.projectId;

  const query = useQuery({
    enabled: !!projectId,
    queryKey: ["project", projectId],
    queryFn: async () => {
      const {data} = await axios.get(`/api/projects/${projectId}`);
      return data;
    },
  });

  return query;
};

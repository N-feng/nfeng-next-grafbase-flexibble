import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProject = (projectId?: string) => {
  console.log('projectId: ', projectId);
  // const params = useParams();

  // const projectId = params.projectId;

  const query = useQuery({
    enabled: !!projectId,
    queryKey: ["project", projectId],
    queryFn: async () => {
      console.log('get data begin projectId: ', projectId);
      const {data} = await axios.get(`/api/projects/${projectId}`);
      console.log('project data: ', data);
      return data;
    },
  });

  return query;
};

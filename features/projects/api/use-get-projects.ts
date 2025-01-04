import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProjects = (page?: number) => {
  const params = useSearchParams();

  const category = params.get("category") || "";

  const query = useQuery({
    // enabled: !!category,
    queryKey: ["projects", { category, page }],
    queryFn: async () => {
      console.log('use get projects category: ', category);
      console.log('use get projects page: ', page);
      const {data} = await axios.get(`/api/projects?category=${category}&page=${page || ''}`, {
        params: {
          page: page
        }
      });
      console.log('projects data: ', data);
      return data;
    },
  });

  return query;
};

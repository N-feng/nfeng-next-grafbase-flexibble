import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProjects = (category?: string) => {
  // const params = useSearchParams();

  // const category = params.get("category") || "";
  console.log('category: ', category);

  const query = useQuery({
    // enabled: !!category,
    queryKey: ["projects", category],
    queryFn: async () => {
      console.log('use get projects category: ', category);
      const {data} = await axios.get(`/api/projects?category=${category}`);
      console.log('projects data: ', data);
      return data;
    },
  });

  return query;
};

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProjects = () => {
  const query = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const {data} = await axios.get(`/api/projects`);
      console.log('get projects data: ', data);
      return data;
    },
  });

  return query;
};

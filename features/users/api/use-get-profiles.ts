import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProfiles = () => {
  const query = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const {data} = await axios.get(`/api/profile`);
      console.log('get profiles data: ', data);
      return data;
    },
  });

  return query;
};

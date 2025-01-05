import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetUser = (userId?: string) => {
  // const params = useParams();
  // console.log('params: ', params);

  // const userId = params.id;

  const query = useQuery({
    enabled: !!userId,
    queryKey: ["user", userId],
    queryFn: async () => {
      console.log('get user begin..', userId)
      const {data} = await axios.get(`/api/users/${userId}`);
      console.log('get user data: ', data);
      return data;
    },
  });

  return query;
};

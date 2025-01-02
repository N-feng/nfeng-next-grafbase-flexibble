import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProfile = (userId?: string) => {
  // const params = useParams();
  // console.log('params: ', params);

  // const userId = params.id;

  const query = useQuery({
    enabled: !!userId,
    queryKey: ["profile", userId],
    queryFn: async () => {
      console.log('get profile begin..', userId)
      const {data} = await axios.get(`/api/profile/${userId}`);
      console.log('get profile data: ', data);
      return data;
    },
  });

  return query;
};

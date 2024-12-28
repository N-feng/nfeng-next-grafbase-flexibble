import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export const useGetProfile = () => {
  const params = useParams();
  console.log('params: ', params);

  const userId = params.id;
  const searchParams = useSearchParams();
  console.log('searchParams: ', searchParams);
  const profileId = searchParams.get("profileId") || "";
  console.log('profileId: ', profileId);

  const query = useQuery({
    enabled: !!userId,
    queryKey: ["profile", userId],
    queryFn: async () => {
      console.log('get profile begin..')
      const {data} = await axios.get(`/api/profile/${userId}`);
      console.log('get profile data: ', data);
      return data;
    },
  });

  return query;
};

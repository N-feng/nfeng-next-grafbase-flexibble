"use client";

import { getUserProjects } from '@/lib/actions'
import ProfilePage from '@/components/ProfilePage'
// import { UserProfile } from '@/common.types';

import { useGetProfile } from '@/features/profiles/api/use-get-profile';
import { Loader2 } from 'lucide-react';
import Modal from '@/components/Modal';

type Props = {
    params: {
        profileId: string,
    },
}

const UserProfile = ({ params }: Props) => {
    // const result = await getUserProjects(params.id, 100) as { user: UserProfile }

    // if (!result?.user) return (
    //     <p className="no-result-text">Failed to fetch user info</p>
    // )
    const profileQuery = useGetProfile(params.profileId);
    const defaultValues = profileQuery.data
      ? profileQuery.data
      : null;

    const profileToDisplay = {
      ...profileQuery.data,
      projects: {
        edges: (profileQuery.data?.projects ?? []).map((item: any) => ({
          node: {
            ...item,
            image: item.images[0].url,
          }
        }))
      } 
    } 
  
    const isLoading = profileQuery.isLoading;

    if (isLoading) return (
      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="w-full h-[500px] flex items-center justify-center">
            <Loader2 className="animate-spin size-6 text-slate-300" />
          </div>
        </div>
      </div>
    )

    return <ProfilePage user={profileToDisplay} />
    // return <ProfilePage user={result?.user}  />
}

export default UserProfile

"use client";

import { getUserProjects } from '@/lib/actions'
import ProfilePage from '@/components/ProfilePage'
// import { UserProfile } from '@/common.types';
import { useGetProfile } from '@/features/profile/api/use-get-profile';
import { Loader2 } from 'lucide-react';
import Modal from '@/components/Modal';
import ProfileForm from '@/app/update-profile/components/profile-form';

type Props = {
    params: {
        id: string,
    },
}

const UserProfile = ({ params }: Props) => {
    const profileQuery = useGetProfile();
    const defaultValues = profileQuery.data
      ? profileQuery.data
      : null;
    console.log('defaultValues: ', defaultValues);
  
    const isLoading = profileQuery.isLoading;
    // const result = await getUserProjects(params.id, 100) as { user: UserProfile }

    // if (!result?.user) return (
    //     <p className="no-result-text">Failed to fetch user info</p>
    // )

    // if (isLoading) return (
    //   <div className="absolute inset-0 flex items-center justify-center">
    //     <Loader2 className="size-4 animate-spin text-muted-foreground" />
    //   </div>
    // )

    return (
      <Modal>
        <h3 className="modal-head-text">Update your profile</h3>
          {
            isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="size-4 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ProfileForm 
                initialData={defaultValues}
                // session={session} 
              />
            )
          }
        
      </Modal>
    )

    // return <ProfilePage user={result?.user}  />
}

export default UserProfile

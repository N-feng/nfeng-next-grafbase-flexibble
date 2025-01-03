"use client";

import Modal from "@/components/Modal";
// import ProjectForm from "@/components/ProjectForm";
// import { getCurrentUser } from "@/lib/session";
// import { getProjectDetails } from "@/lib/actions";
// import { ProjectInterface } from "@/common.types";

import { useGetProfile } from "@/features/profiles/api/use-get-profile";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProfileForm } from "@/features/profiles/components/profile-form";

const EditProfile = ({ params: { userId } }: { params: { userId: string } }) => {
  // const session = await getCurrentUser();
  
  // if (!session?.user) redirect("/")

  // const result = await getProjectDetails(id) as { project?: ProjectInterface };
  
  // if (!result?.project) return (
  //   <p className="no-result-text">Failed to fetch project info</p>
  // )

  const profileQuery = useGetProfile(userId)
  // console.log('userId: ', userId);
  const defaultValues = profileQuery.data
      ? profileQuery.data
      : null;

  const isLoading = profileQuery.isLoading;

  const router = useRouter();

  const onCloseChange = () => {
    router.push(`/profile/${userId}`)
  }

  return (
    <Modal onClose={onCloseChange}>
      <h3 className="modal-head-text">Edit Profile</h3>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ProfileForm 
          initialData={defaultValues} 
          onClose={onCloseChange}
          userId={userId}
        />
      )}
    </Modal>
  );
};

export default EditProfile;

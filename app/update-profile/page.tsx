import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
// import ProjectForm from "@/components/ProjectForm";
import ProfileForm from "../../components/profile-form";

const CreateProject = async () => {
  // const session = await getCurrentUser();

  // if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="modal-head-text">Update your profile</h3>

      <ProfileForm 
        initialData={null}
        // session={session} 
      />
    </Modal>
  );
};

export default CreateProject;

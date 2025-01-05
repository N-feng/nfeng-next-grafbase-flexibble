"use client";

import { redirect, useRouter } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
// import ProjectForm from "@/components/ProjectForm";
import { ProjectForm } from "@/features/projects/components/project-form";

const CreateProject = async () => {
  // const session = await getCurrentUser();

  // if (!session?.user) redirect("/")

  const router = useRouter();
  
  const onCloseChange = () => {
    router.push(`/`)
  }

  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>

      <ProjectForm 
        initialData={null}
        // session={session} 
        onClose={onCloseChange}
      />
    </Modal>
  );
};

export default CreateProject;

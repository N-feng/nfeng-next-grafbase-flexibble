"use client";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import Modal from "@/components/Modal";
// import ProjectForm from "@/components/ProjectForm";
import ProjectForm from "../../../components/project-form";
import { useGetProject } from "@/features/projects/api/use-get-project";
import { Loader2 } from "lucide-react";

const CreateProject = () => {
  const projectQuery = useGetProject()
  const defaultValues = projectQuery.data
      ? projectQuery.data
      : null;

  const isLoading = projectQuery.isLoading;
  // const session = await getCurrentUser();

  // if (!session?.user) redirect("/")

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="size-4 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <ProjectForm 
          initialData={defaultValues}
          // session={session} 
        />
      )}
    </Modal>
  );
};

export default CreateProject;

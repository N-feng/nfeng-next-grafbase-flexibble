"use client";

import { redirect, useRouter } from "next/navigation";

import Modal from "@/components/Modal";
// import ProjectForm from "@/components/ProjectForm";
// import { getCurrentUser } from "@/lib/session";
// import { getProjectDetails } from "@/lib/actions";
// import { ProjectInterface } from "@/common.types";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { Loader2 } from "lucide-react";
import { ProjectForm } from "@/features/projects/components/project-form";

const EditProject = ({ params: { projectId } }: { params: { projectId: string } }) => {
  const projectQuery = useGetProject()
  const defaultValues = projectQuery.data
      ? projectQuery.data
      : null;

  const isLoading = projectQuery.isLoading;
  // const session = await getCurrentUser();

  // if (!session?.user) redirect("/")

  const router = useRouter();

  const onCloseChange = () => {
    router.push(`/project/${projectId}`)
  }

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
          onClose={onCloseChange}
          // session={session} 
        />
        // <ProjectForm 
        //   type="edit"
        //   project={defaultValues}
        // />
      )}
    </Modal>
  );
};

export default EditProject;

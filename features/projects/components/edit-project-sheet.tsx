import { Loader2 } from "lucide-react";

import { useEditProject } from "@/features/projects/hooks/use-edit-project";
import { useGetProject } from "@/features/projects/api/use-get-project";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectForm } from "@/features/projects/components/project-form";

export const EditProjectSheet = () => {
  const { id, isOpen, onClose } = useEditProject();

  const projectQuery = useGetProject()
  const defaultValues = projectQuery.data
      ? projectQuery.data
      : null;

  const isLoading = projectQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>
          <SheetDescription>Edit an existing project</SheetDescription>
        </SheetHeader>

        {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ProjectForm
              initialData={defaultValues}
              onClose={() => {}}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
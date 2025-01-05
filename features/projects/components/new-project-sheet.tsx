import { Loader2 } from "lucide-react";

import { useNewProject } from "@/features/projects/hooks/use-new-project";
import { useGetProject } from "@/features/projects/api/use-get-project";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectForm } from "@/features/projects/components/project-form";

export const NewProjectSheet = () => {
  const { isOpen, onClose } = useNewProject();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>New Project</SheetTitle>
          <SheetDescription>New an existing project</SheetDescription>
        </SheetHeader>

        <ProjectForm
          initialData={null}
          onClose={() => {}}
        />
      </SheetContent>
    </Sheet>
  )
}
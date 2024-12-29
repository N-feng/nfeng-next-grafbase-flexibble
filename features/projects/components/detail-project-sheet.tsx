import { Loader2 } from "lucide-react";

import { useDetailProject } from "@/features/projects/hooks/use-detail-project";
import { useGetProject } from "@/features/projects/api/use-get-project";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProjectDetail } from "@/components/project-detail";

export const DetailProjectSheet = () => {
  const { id, isOpen, onClose } = useDetailProject();


  const projectQuery = useGetProject(id)
  const defaultValues = projectQuery.data
      ? projectQuery.data
      : {
        category: '',
        images: [],
        githubUrl: '',
        avatarUrl: '',
        createdBy: {
          avatarUrl: ''
        }
      };


  const isLoading = projectQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>Detail Project</SheetTitle>
        </SheetHeader>

        {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ProjectDetail
              projectDetails={defaultValues}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
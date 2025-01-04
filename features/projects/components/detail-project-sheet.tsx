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
import { ProjectDetail } from "@/features/projects/components/project-detail";
import { useDetailProfile } from "@/features/profiles/hooks/use-detail-profile";
import { usePathname, useRouter } from "next/navigation";

export const DetailProjectSheet = () => {
  const router = useRouter();
  const pathName = usePathname();
  
  const { id, isOpen, onClose } = useDetailProject();
  const { onOpen } = useDetailProfile();

  const projectQuery = useGetProject()
  const defaultValues = projectQuery.data
      ? projectQuery.data
      : null;

  const isLoading = projectQuery.isLoading;

  const handleProfile = (userId: string) => {
    onClose()
    onOpen(userId)
  }

  const handleProject = (item: string) => {
    onClose()
    router.push(`${pathName}?category=${item}`);
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>Detail Project</SheetTitle>
          <SheetDescription>View an existing project</SheetDescription>
        </SheetHeader>

        {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ProjectDetail
              projectDetails={defaultValues}
              handleProfile={handleProfile}
              handleProject={handleProject}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
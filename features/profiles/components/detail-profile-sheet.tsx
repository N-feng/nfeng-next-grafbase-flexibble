import { Loader2 } from "lucide-react";

import { useDetailProfile } from "@/features/profiles/hooks/use-detail-profile";
import { useGetProfile } from "@/features/profiles/api/use-get-profile";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfilePage from "@/features/profiles/components/profile-page";

export const DetailProfileSheet = () => {
  const { id, isOpen, onClose } = useDetailProfile();

  const profileQuery = useGetProfile(id)
  const defaultValues = profileQuery.data
      ? profileQuery.data
      : null;

  const profileToDisplay = {
    ...profileQuery.data,
    projects: {
      edges: (profileQuery.data?.projects ?? []).map((item: any) => ({
        node: {
          ...item,
          image: item.images[0].url,
        }
      }))
    } 
  } 

  const isLoading = profileQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>Detail Profile</SheetTitle>
          <SheetDescription>View an existing profile</SheetDescription>
        </SheetHeader>

        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <ProfilePage 
            user={profileToDisplay} 
          />
        )}
      </SheetContent>
    </Sheet>
  )
}
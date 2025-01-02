import { Loader2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileForm from "@/features/profiles/components/profile-form";

import { useEditProfile } from "@/features/profiles/hooks/use-edit-profile";
import { useGetProfile } from "@/features/profiles/api/use-get-profile";

export const EditProfileSheet = () => {
  const { id, isOpen, onClose } = useEditProfile();

  const profileQuery = useGetProfile(id)
  const defaultValues = profileQuery.data
      ? profileQuery.data
      : null;

  const isLoading = profileQuery.isLoading;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>Edit Profile</SheetTitle>
          <SheetDescription>Edit an existing profile</SheetDescription>
        </SheetHeader>

        {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <ProfileForm
              initialData={defaultValues}
            />
          )}
      </SheetContent>
    </Sheet>
  )
}
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProfileForm from "@/features/profiles/components/profile-form";

import { useNewProfile } from "@/features/profiles/hooks/use-new-profile";

export const NewProfileSheet = () => {
  const { isOpen, onClose } = useNewProfile();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4 h-full overflow-auto" side={"bottom"} style={{ maxHeight: '90%' }}>
        <SheetHeader>
          <SheetTitle>New Profile</SheetTitle>
          <SheetDescription>New an existing profile</SheetDescription>
        </SheetHeader>

        <ProfileForm
          initialData={null}
        />
      </SheetContent>
    </Sheet>
  )
}
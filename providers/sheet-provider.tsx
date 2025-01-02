"use client";

import { useMountedState } from "react-use";

import { DetailProjectSheet } from "@/features/projects/components/detail-project-sheet";
import { EditProjectSheet } from "@/features/projects/components/edit-project-sheet";
import { NewProjectSheet } from "@/features/projects/components/new-project-sheet";

import { DetailProfileSheet } from "@/features/profiles/components/detail-profile-sheet";
import { EditProfileSheet } from "@/features/profiles/components/edit-profile-sheet";
import { NewProfileSheet } from "@/features/profiles/components/new-profile-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <DetailProjectSheet />
      <EditProjectSheet />
      <NewProjectSheet />

      <DetailProfileSheet />
      <EditProfileSheet />
      <NewProfileSheet />
    </>
  );
};

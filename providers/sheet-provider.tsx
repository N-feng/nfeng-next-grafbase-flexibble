"use client";

import { useMountedState } from "react-use";

import { DetailProjectSheet } from "@/features/projects/components/detail-project-sheet";
import { EditProjectSheet } from "@/features/projects/components/edit-project-sheet";
import { NewProjectSheet } from "@/features/projects/components/new-project-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <DetailProjectSheet />
      <EditProjectSheet />
      <NewProjectSheet />
    </>
  );
};

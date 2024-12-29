"use client";

import { useMountedState } from "react-use";

import { DetailProjectSheet } from "@/features/projects/components/detail-project-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <DetailProjectSheet />
    </>
  );
};

"use client";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Loader2 } from "lucide-react";

import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";

import { ProjectInterface } from "@/common.types";
import { useSearchParams } from "next/navigation";

type ProjectSearch = {
  projectSearch: {
    edges: { node: ProjectInterface }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  },
}

const ProjectsList = () => {
  const params = useSearchParams();
  const category = params.get("category") || "";

  const projectsQuery = useGetProjects(category);

  const projectsToDisplay = (projectsQuery.data ?? []).map((item: any) => ({
    node: {
      ...item,
      image: item.images[0].url,
    }
  }))

  if (projectsQuery.isLoading) { 
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        
        <div className="flex-col">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="w-full h-[500px] flex items-center justify-center">
              <Loader2 className="animate-spin size-6 text-slate-300" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }

  return (
    <section className="flexStart flex-col paddings mb-16">
      <Categories />

      <section className="projects-grid">
        {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            userId={node?.createdBy.id}
          />
        ))}
      </section>

      {/* <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      /> */}
    </section>
  )
}

export default ProjectsList;
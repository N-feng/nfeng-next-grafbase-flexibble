"use client";

import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { Loader2 } from "lucide-react";
import Pagination from "@/components/Pagination";

type SearchParams = {
  category?: string | undefined;
  endcursor?: string | null;
  page?: string | undefined;
}

type Props = {
  searchParams: SearchParams
}

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

// export const dynamic = 'force-dynamic';
// export const dynamicParams = true;
// export const revalidate = 0;

const Home = ({ searchParams: { category, endcursor, page } }: Props) => {
  // const data = await fetchAllProjects(category, endcursor) as ProjectSearch
  const p = page ? parseInt(page) : 1;
  const projectsQuery = useGetProjects(p);

  // const projectsToDisplay = data?.projectSearch?.edges || [];
  const projectsToDisplay = projectsQuery.data?.projectSearch?.edges || [];
  // const data = projectsQuery?.data;
  const count = projectsQuery?.data?.projectSearch?.count;
  // const projectsToDisplay = (projectsQuery.data ?? []).map((item: any) => ({
  //   node: {
  //     ...item,
  //     image: item.images[0].url,
  //   }
  // }))

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
        {/* {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => (
          <ProjectCard
            key={`${node?.id}`}
            id={node?.id}
            image={node?.image}
            title={node?.title}
            name={node?.createdBy.name}
            avatarUrl={node?.createdBy.avatarUrl}
            // userId={node?.createdBy.id}
            userId={node?.createdBy.userId}
          />
        ))} */}
      </section>

      {/* <LoadMore 
        startCursor={data?.projectSearch?.pageInfo?.startCursor} 
        endCursor={data?.projectSearch?.pageInfo?.endCursor} 
        hasPreviousPage={data?.projectSearch?.pageInfo?.hasPreviousPage} 
        hasNextPage={data?.projectSearch?.pageInfo.hasNextPage}
      /> */}
      <Pagination page={p} count={count} />
    </section>
  )
};

export default Home;

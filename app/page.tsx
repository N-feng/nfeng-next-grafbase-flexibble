// "use client";

import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { fetchAllProjects } from "@/lib/actions";
import prismadb from "@/lib/prismadb";
import { Loader2 } from "lucide-react";

type SearchParams = {
  category?: string | null;
  endcursor?: string | null;
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

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams: { category, endcursor } }: Props) => {
  console.log('category: ', category);
  // const projectsQuery = useGetProjects()
  // const data = await fetchAllProjects(category, endcursor) as ProjectSearch

  const projects = await prismadb.project.findMany({
    where: {
      // userId: params.storeId,
      category: category || '',
    },
    include: {
      images: true,
    },
    orderBy: {
      createdAt: 'desc',
    }
  });
  console.log('projects: ', projects);

  const projectsToDisplay = projects.map((item) => ({
    node: {
      ...item,
      image: item.images[0].url,
      createdBy: {
        name: "",
        avatarUrl: "",
        id: "",
        email: "",
      }
    }
  }))

  // const projectsToDisplay = data?.projectSearch?.edges || [];
  console.log('projectsToDisplay: ', projectsToDisplay);

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />

        <p className="no-result-text text-center">No projects found, go create some first.</p>
      </section>
    )
  }

  // if (projectsQuery.isLoading) {
  //   return (
  //     <div className="flex-col">
  //       <div className="flex-1 space-y-4 p-8 pt-6">
  //         <div className="w-full h-[500px] flex items-center justify-center">
  //           <Loader2 className="animate-spin size-6 text-slate-300" />
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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
};

export default Home;

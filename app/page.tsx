import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import LoadMore from "@/components/LoadMore";
import ProjectCard from "@/components/ProjectCard";
import ProjectsList from "@/components/projects-list";
import { fetchAllProjects } from "@/lib/actions";

type SearchParams = {
  category?: string | undefined;
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

const Home = ({ searchParams: { category, endcursor } }: Props) => {
  console.log('category: ', category);
  // const data = await fetchAllProjects(category, endcursor) as ProjectSearch

  // const projectsToDisplay = data?.projectSearch?.edges || [];

  return (
    <>
      <ProjectsList />
    </>
  )
};

export default Home;

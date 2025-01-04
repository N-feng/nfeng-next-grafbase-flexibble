"use client";

import Image from "next/image"
import Link from "next/link"

import { getCurrentUser } from "@/lib/session"
import { getProjectDetails } from "@/lib/actions"
import Modal from "@/components/Modal"
import ProjectActions from "@/components/ProjectActions"
import RelatedProjects from "@/components/RelatedProjects"
import { ProjectInterface } from "@/common.types"

import { useGetProject } from "@/features/projects/api/use-get-project"
import { Loader2 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";

const Project = (
  { params: { id, projectId } }: { params: { id: string, projectId: string } }

) => {
  // const session = await getCurrentUser()
  // const result = await getProjectDetails(id) as { project?: ProjectInterface}
  const projectQuery = useGetProject()
  const defaultValues = projectQuery.data
      ? projectQuery.data
      : null;

  const { userId } = useAuth();
  
  const isLoading = projectQuery.isLoading;

  const projectDetails = defaultValues
  // const projectDetails = result?.project

  // const renderLink = () => `/profile/${projectDetails?.createdBy?.id}`
  const renderLink = () => `/profile/${projectDetails?.createdBy?.userId}`

  if (isLoading) return (
    <Modal>
      <div className="absolute inset-0 flex items-center justify-center">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    </Modal>
  )

  // if (!result?.project) return (
  //     <p className="no-result-text">Failed to fetch project info</p>
  // )
  if (!defaultValues) return (
    <Modal>
      <p className="no-result-text">Failed to fetch project info</p>
    </Modal>
  )

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
          <Link href={renderLink()}>
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              width={50}
              height={50}
              alt="profile"
              className="rounded-full"
            />
          </Link>

          <div className="flex-1 flexStart flex-col gap-1">
            <p className="self-start text-lg font-semibold">
                {projectDetails?.title}
            </p>
            <div className="user-info">
              <Link href={renderLink()}>
                {projectDetails?.createdBy?.name}
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link href={`/?category=${projectDetails.category}`} className="text-primary-purple font-semibold"> 
                {projectDetails?.category}
              </Link>
            </div>
          </div>
        </div>

        {/* {session?.user?.email === projectDetails?.createdBy?.email && (
            <div className="flex justify-end items-center gap-2">
                <ProjectActions projectId={projectDetails?.id} />
            </div>
        )} */}

        {userId === projectDetails?.userId && (
            <div className="flex justify-end items-center gap-2">
                <ProjectActions projectId={projectDetails?.id} />
            </div>
        )}
      </section>

      <section className="mt-14">
          {projectDetails?.images.map((item: any) => (
            <Image
              key={item.id}
              src={`${item.url}`}
              className="object-cover rounded-2xl"
              width={1064}
              height={798}
              alt="poster"
            />
          ))}
          
      </section>

      <section className="flexCenter flex-col mt-20">
          <p className="max-w-5xl text-xl font-normal">
              {projectDetails?.description}
          </p>

          <div className="flex flex-wrap mt-5 gap-5">
              <Link href={projectDetails?.githubUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                  🖥 <span className="underline">Github</span> 
              </Link>
              <Image src="/dot.svg" width={4} height={4} alt="dot" />
              <Link href={projectDetails?.liveSiteUrl} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                  🚀 <span className="underline">Live Site</span> 
              </Link>
          </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
          <Link href={renderLink()} className="min-w-[82px] h-[82px]">
            <Image
              src={projectDetails?.createdBy?.avatarUrl}
              className="rounded-full"
              width={82}
              height={82}
              alt="profile image"
            />
          </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects 
        // userId={projectDetails?.createdBy?.id} 
        userId={projectDetails?.createdBy?.userId} 
        projectId={projectDetails?.id} 
      />
    </Modal>
  )
}

export default Project

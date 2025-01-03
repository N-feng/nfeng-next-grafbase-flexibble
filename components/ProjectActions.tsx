"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { deleteProject, fetchToken } from '@/lib/actions'
import { useDetailProject } from '@/features/projects/hooks/use-detail-project'
import { useEditProject } from '@/features/projects/hooks/use-edit-project'

type Props = {
    projectId: string
}

const ProjectActions = ({ projectId }: Props) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false)
    const router = useRouter()
    // const { onClose } = useDetailProject()
    // const { onOpen } = useEditProject()
    
    const handleDeleteProject = async () => {
        setIsDeleting(true)
        
        const { token } = await fetchToken();

        try {
            await deleteProject(projectId, token);
            
            router.push("/");
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    const handleClick = () => {
    //   onClose()
    //   onOpen(projectId)
    }

    return (
        <>
            <Link href={`/edit-project/${projectId}`} className="flexCenter edit-action_btn">
            {/* <a onClick={handleClick} className="flexCenter edit-action_btn cursor-pointer"> */}
              <Image src="/pencile.svg" width={15} height={15} alt="edit" />
            {/* </a> */}
            </Link>

            <button
                type="button"
                disabled={isDeleting}
                className={`flexCenter delete-action_btn ${isDeleting ? "bg-gray" : "bg-primary-purple"}`}
                onClick={handleDeleteProject}
            >
                <Image src="/trash.svg" width={15} height={15} alt="delete" />
            </button>
        </>
    )
}

export default ProjectActions
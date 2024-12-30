"use client"

import { useState } from 'react'
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import ImageUpload from '@/components/ui/ImageUpload';
import { Project, Image } from '@prisma/client';
import { z } from 'zod';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useCreateProject } from '@/features/projects/api/use-create-project';
import { useEditProject } from '@/features/projects/api/use-edit-project';

const formSchema = z.object({
  images: z.object({ url: z.string() }).array().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  liveSiteUrl: z.string().min(1),
  githubUrl: z.string().min(1),
  category: z.string().min(1),
});
  
export type FormValues = z.infer<typeof formSchema>

interface ProjectFormProps {
  initialData: Project & {
    images: Image[]
  } | null;
  // categories: Category[];
};

export const ProjectForm = ({ 
  initialData
}: ProjectFormProps) => {
  const router = useRouter()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit form' : 'Create form';
  const description = initialData ? 'Edit a form.' : 'Add a new form';
  const toastMessage = initialData ? 'Form updated.' : 'Form created.';
  const action = initialData ? 'Save changes' : 'Create';

  const [submitting, setSubmitting] = useState<boolean>(false);
  // const [form, setForm] = useState<FormState>({
  //     title: project?.title || "",
  //     description: project?.description || "",
  //     image: project?.image || "",
  //     liveSiteUrl: project?.liveSiteUrl || "",
  //     githubUrl: project?.githubUrl || "",
  //     category: project?.category || ""
  // })

  const defaultValues = initialData ? {
    ...initialData,
  //   price: parseFloat(String(initialData?.price)),
  } : {
    images: [],
    title: '',
    description: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',
  }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  
  const projectMutation = useEditProject();
  const mutation = useCreateProject()
  
  const onSubmit = async (data: FormValues) => {
    console.log('data: ', data);
    const values = {
      ...data,
    }
    try {
      setLoading(true);
      if (initialData) {
        projectMutation.mutate(values);
      } else {
        mutation.mutate(values);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flexStart form" style={{ paddingTop: '1rem' }}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Title</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Project title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Images</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value.map((image) => image.url)} 
                  disabled={loading} 
                  onChange={(url) => field.onChange([...field.value, { url }])}
                  onRemove={(url) => field.onChange([...field.value.filter((current) => current.url !== url)])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Description</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Project description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="liveSiteUrl"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Website URL</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Project liveSiteUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubUrl"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">GitHub URL</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Project githubUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Category</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Project category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flexStart w-full flex items-center justify-between">
          <Button disabled={loading} className="ml-auto1" type="submit">
            {action}
          </Button>
        </div>
      </form>
    </Form>
  )
}


"use client"

import { useState } from 'react'
import { toast } from "react-hot-toast";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';

import ImageUpload from '@/components/ui/ImageUpload';
import { Profile } from '@prisma/client';
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
import { useEditProfile } from '@/features/profile/api/use-edit-profile';

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1),
  avatarUrl: z.string().min(1),
  description: z.string().min(1),
  githubUrl: z.string().min(1),
  linkedinUrl: z.string().min(1),
});
  
export type FormValues = z.infer<typeof formSchema>

interface ProfileFormProps {
  initialData: Profile | null;
  // categories: Category[];
};

export const ProfileForm = ({ 
  initialData
}: ProfileFormProps) => {
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
    name: '',
    email: '',
    avatarUrl: '',
    description: '',
    githubUrl: '',
    linkedinUrl: '',
  }
  console.log('defaultValues: ', defaultValues);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  
  const mutation = useEditProfile()
  
  const onSubmit = async (data: FormValues) => {
    console.log('data: ', data);
    const values = {
      ...data,
    }
    mutation.mutate(values);
    try {
      setLoading(true);
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full flexStart form">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Profile name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Email</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Profile email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatarUrl"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Images</FormLabel>
              <FormControl>
                <ImageUpload 
                  value={field.value ? [field.value] : []} 
                  disabled={loading} 
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange('')}
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
                <Input disabled={loading} placeholder="Profile description" {...field} />
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
                <Input disabled={loading} placeholder="Profile githubUrl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkedinUrl"
          render={({ field }) => (
            <FormItem className="flexStart flex-col w-full gap-4">
              <FormLabel className="w-full text-gray-100">Website URL</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Profile linkedinUrl" {...field} />
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

export default ProfileForm

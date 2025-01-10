"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UpdateSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

import { useConfirmationModal } from "@/components/ConfirmationModal";
import { Project } from "@/types/projectTypes/types";
import { useUpdateProject } from "../hooks/projectsApi/useUpdateProject";
import { useDeleteProject } from "../hooks/projectsApi/useDeleteProject";

interface ProjectFormProps {
  onCancel?: () => void;
  initialValues: Project;
}

export function EditProjectForm({ onCancel, initialValues }: ProjectFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: updateProject, isPending: isUpdatingProject } =
    useUpdateProject();

  const { mutate: deleteProject, isPending: isDeletingProject } =
    useDeleteProject();

  const [ConfirmationModal, confirmDelete] = useConfirmationModal(
    "Delete project",
    "This action cannot be undone",
    "destructive"
  );

  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof UpdateSchema>) {
    const finalFileValue = {
      ...values,
      image: (values.image instanceof File && values.image) || "",
    };

    updateProject(
      { form: finalFileValue, param: { projectId: initialValues.$id } },
      {
        onSuccess: () => {
          form.reset();
          router.push("/");
        },
      }
    );
  }

  async function handleDelete() {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteProject(
      {
        // @ts-expect-error ignore error
        form: null,
        param: { projectId: initialValues.$id },
      },

      {
        onSuccess: () => {
          window.location.href = `/workspaces/${initialValues.workspaceId}`;
        },
      }
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) form.setValue("image", file);
  }

  return (
    <div className="flex flex-col gap-y-4">
      <ConfirmationModal />

      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 skew-y-0">
          <Button
            size="sm"
            variant="secondary"
            className="mt-2"
            onClick={() =>
              router.push(
                `/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`
              )
            }
          >
            <ArrowLeft className="size-4 " /> Back
          </Button>
          <CardTitle className="text-xl font-bold">
            {initialValues.name}
          </CardTitle>
        </CardHeader>
        <div className="px-7">
          <DottedSeparator />
        </div>
        <CardContent className="p-7">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter project name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex flex-col gap-y-2 mt-5">
                      <div className="flex items-center gap-x-5">
                        {(field.value && (
                          <div className="size-[72px] relative overflow-hidden ">
                            <Image
                              src={
                                field.value instanceof File
                                  ? URL.createObjectURL(field.value)
                                  : field.value
                              }
                              alt="workspace icon"
                              fill
                            />
                          </div>
                        )) || (
                          <Avatar className="size-[72px]">
                            <AvatarFallback>
                              <ImageIcon className="size-[36px] text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className="flex flex-col">
                          <p className="text-sm">Project Icon</p>
                          <p className="text-sm text-muted-foreground ">
                            JPG,PNG,SVG or JPEG (max 1mb)
                          </p>
                          <input
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isUpdatingProject}
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isUpdatingProject}
                              variant="destructive"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current) {
                                  inputRef.current.value = "";
                                }
                              }}
                            >
                              Remove image
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={isUpdatingProject}
                              variant="teritary"
                              size="xs"
                              className="w-fit mt-2"
                              onClick={() => inputRef.current?.click()}
                            >
                              Upload image
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                />
              </div>
              <DottedSeparator clasName="py-7" />
              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  size="lg"
                  variant="secondary"
                  onClick={onCancel}
                  disabled={isUpdatingProject}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancle
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isUpdatingProject || isDeletingProject}
                >
                  Save changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none ">
        <CardContent className="p-7 ">
          <div className="flex flex-col ">
            <h3 className="font-bold ">Delete your project</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a project is irreversible and will remove all associated
              information.
            </p>
            <DottedSeparator clasName="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              variant="destructive"
              size="sm"
              type="button"
              disabled={isUpdatingProject || isDeletingProject}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

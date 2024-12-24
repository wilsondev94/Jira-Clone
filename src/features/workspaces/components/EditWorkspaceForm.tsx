"use client";

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
import { UpdateworkspaceSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CopyIcon, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateWorkspace } from "../customWorkspacesApiHook/useUpdateWorkspace";
import { Workspace } from "../type";
import { useConfirmationModal } from "@/components/ConfirmationModal";
import { useDeleteWorkspace } from "../customWorkspacesApiHook/useDeleteWorkspace";
import { toast } from "sonner";
import { useResetInviteCode } from "../customWorkspacesApiHook/useResetInviteCode";

interface WorkspaceFormProps {
  onCancel?: () => void;
  initialValues: Workspace;
}

export function EditWorkspaceForm({
  onCancel,
  initialValues,
}: WorkspaceFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();

  const { mutate: deleteWorkspace, isPending: isDeletingWorkspace } =
    useDeleteWorkspace();

  const { mutate: resetInviteCode, isPending: isResetingInviteCode } =
    useResetInviteCode();

  const [ConfirmationModal, confirmDelete] = useConfirmationModal(
    "Delete workspace",
    "This action cannot be undone",
    "destructive"
  );
  const [ResetModal, confirmReset] = useConfirmationModal(
    "Reset invite link",
    "this will change the current invite link.",
    "destructive"
  );

  const form = useForm<z.infer<typeof UpdateworkspaceSchema>>({
    resolver: zodResolver(UpdateworkspaceSchema),
    defaultValues: {
      ...initialValues,
      image: initialValues.imageUrl ?? undefined,
    },
  });

  async function handleDelete() {
    const ok = await confirmDelete();
    if (!ok) return;

    deleteWorkspace(
      {
        form: undefined,
        param: { workspaceId: initialValues.$id },
      },

      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  }
  async function handleReset() {
    const ok = await confirmReset();
    if (!ok) return;

    resetInviteCode(
      {
        param: { workspaceId: initialValues.$id },
        form: undefined,
      },
      {
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  }

  function onSubmit(values: z.infer<typeof UpdateworkspaceSchema>) {
    const finalFileValue = {
      ...values,
      image: (values.image instanceof File && values.image) || "",
    };

    updateWorkspace(
      { form: finalFileValue, param: { workspaceId: initialValues.$id } },
      {
        onSuccess: ({ data }) => {
          form.reset();
          router.push(`/workspaces/${data.$id}`);
        },
      }
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) form.setValue("image", file);
  }

  const inviteLink = `${window.location.origin}/worspaces/${initialValues.$id}/join/${initialValues.inviteCode}`;

  const handleCopyInviteLink = () => {
    navigator.clipboard
      .writeText(inviteLink)
      .then(() => toast.success("Invite link copied."));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <ConfirmationModal />
      <ResetModal />
      <Card className="w-full h-full border-none shadow-none">
        <CardHeader className="flex flex-row items-center gap-x-4 p-7 skew-y-0">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => router.push(`/workspaces/${initialValues.$id}`)}
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
                      <FormLabel>Workspace name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter workspace name" />
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
                          <p className="text-sm">Workspace Icon</p>
                          <p className="text-sm text-muted-foreground">
                            JPG,PNG,SVG or JPEG (max 1mb)
                          </p>
                          <input
                            type="file"
                            accept=".jpg, .png, .jpeg, .svg"
                            ref={inputRef}
                            disabled={isUpdatingWorkspace}
                            onChange={handleImageChange}
                            className="hidden"
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={isUpdatingWorkspace}
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
                              disabled={isUpdatingWorkspace}
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
                  disabled={isUpdatingWorkspace}
                  className={cn(!onCancel && "invisible")}
                >
                  Cancle
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isUpdatingWorkspace || isDeletingWorkspace}
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
            <h3 className="font-bold ">Invite members</h3>
            <p className="text-sm text-muted-foreground">
              Add members to your workspace with the invite link.
            </p>
            <div className="mt-4">
              <div className="flex items-center gap-x-2">
                <Input disabled value={inviteLink} />
                <Button
                  onClick={handleCopyInviteLink}
                  variant="secondary"
                  className="size-12"
                >
                  <CopyIcon className="size-5" />
                </Button>
              </div>
            </div>
            <DottedSeparator clasName="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              variant="destructive"
              size="sm"
              type="button"
              disabled={isUpdatingWorkspace || isResetingInviteCode}
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full h-full border-none shadow-none ">
        <CardContent className="p-7 ">
          <div className="flex flex-col ">
            <h3 className="font-bold ">Delete your workspace</h3>
            <p className="text-sm text-muted-foreground">
              Deleting a workspace is irreversible and will remove all
              associated information.
            </p>
            <DottedSeparator clasName="py-7" />
            <Button
              className="mt-6 w-fit ml-auto"
              variant="destructive"
              size="sm"
              type="button"
              disabled={isUpdatingWorkspace || isDeletingWorkspace}
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

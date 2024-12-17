"use client";

import { DottedSeparator } from "@/components/DottedSeparator";
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
import { workspaceSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateWorkspace } from "../customWorkspacesApiHook/useCreateWorkspace";
import { useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface WorkspaceFormProps {
  onCancel?: () => void;
}

export function WorkspaceForm({ onCancel }: WorkspaceFormProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useCreateWorkspace();

  const form = useForm<z.infer<typeof workspaceSchema>>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof workspaceSchema>) {
    const finalFileValue = {
      ...values,
      image: (values.image instanceof File && values.image) || "",
    };

    mutate(
      { form: finalFileValue },
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

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle className="text-xl font-bold">
          Create A new Workspace
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
                          disabled={isPending}
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          disabled={isPending}
                          variant="teritary"
                          size="xs"
                          className="w-fit mt-2"
                          onClick={() => inputRef.current?.click()}
                        >
                          Upload image
                        </Button>
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
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancle
              </Button>
              <Button type="submit" size="lg" disabled={isPending}>
                Create Workspace
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

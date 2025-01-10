import { useState } from "react";
import { PencilIcon, XIcon } from "lucide-react";

import { DottedSeparator } from "@/components/DottedSeparator";
import { Button } from "@/components/ui/button";
import { useUpdateTask } from "../hooks/taskApi/useUpdateTask";
import { TaskOverViewAndDescriptionProps } from "@/types/taskTypes/types";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function TaskDescription({
  task,
}: TaskOverViewAndDescriptionProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(task.description);

  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  function handleEdit() {
    updateTask(
      {
        json: { description: value },
        param: { taskId: task.$id },
      },
      {
        onSuccess: () => {
          setIsEditing(false);
          router.refresh();
        },
      }
    );
  }

  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold">Description</p>
        <Button
          size="sm"
          variant="secondary"
          onClick={() => setIsEditing((prev) => !prev)}
        >
          {isEditing ? (
            <XIcon className="size-4 mr-2" />
          ) : (
            <PencilIcon className="size-4 mr-2" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>
      <DottedSeparator clasName="my-4" />
      {isEditing ? (
        <div className="flex flex-col gap-y-4">
          <Textarea
            placeholder="Add a description..."
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isUpdating}
          />
          <Button
            size="sm"
            className="w-fit ml-auto"
            onClick={handleEdit}
            disabled={isUpdating}
          >
            {isUpdating ? "Saving..." : "Save changes"}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className="text-muted-foreground">
              No description for this task.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

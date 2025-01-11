import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { DottedSeparator } from "@/components/DottedSeparator";
import AnalyticsCard from "./AnalyticsCard";
import { ResponseProjectAnalyticsType } from "@/features/projects/hooks/projectsApi/useGetProjectAnalytics";

export function Analytics({ data }: ResponseProjectAnalyticsType) {
  return (
    <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
      <div className="w-full flex flex-row">
        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Total task"
            value={data.taskCount}
            variant={data.taskDifference > 0 ? "up" : "down"}
            increaseValue={data.taskDifference}
          />
        </div>

        <DottedSeparator direction="vertical" />

        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Assigned task"
            value={data.assignedTaskCount}
            variant={data.assignedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.assignedTaskDifference}
          />
        </div>

        <DottedSeparator direction="vertical" />

        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Completed task"
            value={data.completedTaskCount}
            variant={data.completedTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.completedTaskDifference}
          />
        </div>

        <DottedSeparator direction="vertical" />

        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Overdue task"
            value={data.overdueTaskCount}
            variant={data.overdueTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.overdueTaskDifference}
          />
        </div>

        <DottedSeparator direction="vertical" />

        <div className="flex items-center flex-1">
          <AnalyticsCard
            title="Incomplete task"
            value={data.incompleteTaskCount}
            variant={data.incompleteTaskDifference > 0 ? "up" : "down"}
            increaseValue={data.incompleteTaskDifference}
          />
        </div>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

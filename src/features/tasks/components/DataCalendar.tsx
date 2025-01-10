import { useState } from "react";

import { enUS } from "date-fns/locale";
import {
  addMonths,
  format,
  getDay,
  parse,
  startOfWeek,
  subMonths,
} from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./dataCalendar.css";

import { CustomToolbarProps, DataCalendarProps } from "@/types/taskTypes/types";
import { EventCard } from "./EventCard";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export function DataCalendar({ data }: DataCalendarProps) {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date()
  );

  const events = data.map((task) => {
    const { dueDate, name, project, assignee, status, $id } = task;

    return {
      start: new Date(dueDate),
      end: new Date(dueDate),
      title: name,
      project: project,
      assignee: assignee,
      status: status,
      id: $id,
    };
  });

  function handleNavigate(action: "PREVIOUS" | "NEXT" | "TODAY") {
    if (action === "PREVIOUS") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      new Date();
    }
  }

  return (
    <Calendar
      localizer={localizer}
      date={value}
      events={events}
      views={["month"]}
      defaultView="month"
      toolbar
      showAllEvents
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      className="h-full "
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            assignee={event.assignee}
            project={event.project}
            status={event.status}
          />
        ),

        toolbar: () => (
          <CustomToolbar date={value} onNavigate={handleNavigate} />
        ),
      }}
    />
  );
}

export function CustomToolbar({ date, onNavigate }: CustomToolbarProps) {
  return (
    <div className="flex mb-4 gap-x-2 items-center justify-center w-full lg:w-auto lg:justify-start ">
      <Button
        onClick={() => onNavigate("PREVIOUS")}
        variant="secondary"
        size="icon"
      >
        <ChevronLeftIcon className=" size-4 " />
      </Button>
      <div className="flex items-center border border-input rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto">
        <CalendarIcon className=" size-4 mr-2 " />
        <p className="text-sm ">{format(date, "MM yyyy")}</p>
      </div>

      <Button
        onClick={() => onNavigate("NEXT")}
        variant="secondary"
        size="icon"
      >
        <ChevronRightIcon className=" size-4 " />
      </Button>
    </div>
  );
}

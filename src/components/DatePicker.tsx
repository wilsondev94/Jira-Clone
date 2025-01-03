"use client";

import { DatePickerProps } from "@/types/types";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

export default function DatePicker({
  value,
  onChange,
  className,
  placeholder = "Select date",
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            "w-full justify-start text-left font-normal px-3",
            !value && "text-muted-foreground ",
            className
          )}
        >
          <CalendarIcon className=" mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}s</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          className="w-auto p-0"
          mode="single"
          selected={value}
          onSelect={(date) => onChange(date as Date)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

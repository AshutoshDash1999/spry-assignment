"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { IconPlus } from "@tabler/icons-react"
import { TASK_STATUSES, type TaskStatus } from "@/lib/task-store"

interface TaskFilterSortBarProps {
  selectedStatus: TaskStatus | "All"
  sortBy: "asc" | "desc"
  onStatusChange: (status: string | null) => void
  onSortChange: (sort: string | null) => void
  onAddClick: () => void
}

export function TaskFilterSortBar({
  selectedStatus,
  sortBy,
  onStatusChange,
  onSortChange,
  onAddClick,
}: TaskFilterSortBarProps) {
  return (
    <div className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-wrap gap-3">
            <Select value={selectedStatus} onValueChange={onStatusChange}>
              <SelectTrigger className="w-fit sm:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                {TASK_STATUSES.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger className="w-fit sm:w-56">
                <SelectValue placeholder="Sort by due date">
                  {sortBy === "asc"
                    ? "Due Date: Earliest First"
                    : "Due Date: Latest First"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Due Date: Earliest First</SelectItem>
                <SelectItem value="desc">Due Date: Latest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={onAddClick}>
            <IconPlus data-icon="inline-start" />
            Add Task
          </Button>
        </div>
      </div>
    </div>
  )
}

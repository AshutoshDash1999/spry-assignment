"use client"

import * as React from "react"
import { format, parseISO, startOfDay } from "date-fns"
import { IconCalendar } from "@tabler/icons-react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { TASK_STATUSES, type Task, type TaskStatus } from "@/lib/task-store"

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  onSubmit: (values: Omit<Task, "id">) => void
}

const emptyForm = {
  title: "",
  description: "",
  status: "Pending" as TaskStatus,
  dueDate: "",
}

export function TaskFormDialog({
  open,
  onOpenChange,
  task,
  onSubmit,
}: TaskFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {open && (
          <TaskForm
            key={task?.id ?? "new"}
            task={task}
            onSubmit={onSubmit}
            onOpenChange={onOpenChange}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

interface TaskFormProps {
  task?: Task
  onSubmit: (values: Omit<Task, "id">) => void
  onOpenChange: (open: boolean) => void
}

function TaskForm({ task, onSubmit, onOpenChange }: TaskFormProps) {
  const [title, setTitle] = React.useState(task?.title ?? emptyForm.title)
  const [description, setDescription] = React.useState(
    task?.description ?? emptyForm.description
  )
  const [status, setStatus] = React.useState<TaskStatus>(
    task?.status ?? emptyForm.status
  )
  const [dueDate, setDueDate] = React.useState(
    task?.dueDate ?? emptyForm.dueDate
  )
  const [errors, setErrors] = React.useState<{
    title?: string
    dueDate?: string
  }>({})
  const [datePickerOpen, setDatePickerOpen] = React.useState(false)

  const today = startOfDay(new Date())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const nextErrors: { title?: string; dueDate?: string } = {}
    if (!title.trim()) nextErrors.title = "Title is required"
    if (!dueDate) nextErrors.dueDate = "Due date is required"

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    onSubmit({ title: title.trim(), description, status, dueDate })
    onOpenChange(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <DialogHeader>
        <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
        <DialogDescription>
          {task
            ? "Update the details of your task."
            : "Fill in the details for your new task."}
        </DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <Label htmlFor="task-title">Title</Label>
        <Input
          id="task-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!errors.title}
          placeholder="e.g. Write project proposal"
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more detail (optional)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="task-status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => value && setStatus(value as TaskStatus)}
          >
            <SelectTrigger id="task-status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TASK_STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="task-due-date">Due Date</Label>
          <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
            <PopoverTrigger
              render={
                <Button
                  id="task-due-date"
                  type="button"
                  variant="outline"
                  aria-invalid={!!errors.dueDate}
                  className={cn(
                    "w-full justify-start font-normal",
                    !dueDate && "text-muted-foreground"
                  )}
                />
              }
            >
              <IconCalendar data-icon="inline-start" />
              {dueDate
                ? format(parseISO(dueDate), "MMM d, yyyy")
                : "Pick a date"}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate ? parseISO(dueDate) : undefined}
                onSelect={(date) => {
                  if (!date) return
                  setDueDate(format(date, "yyyy-MM-dd"))
                  setDatePickerOpen(false)
                }}
                disabled={{ before: today }}
                defaultMonth={dueDate ? parseISO(dueDate) : today}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && (
            <p className="text-sm text-destructive">{errors.dueDate}</p>
          )}
        </div>
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          Cancel
        </Button>
        <Button type="submit">{task ? "Save Changes" : "Add Task"}</Button>
      </DialogFooter>
    </form>
  )
}

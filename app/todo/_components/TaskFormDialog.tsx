"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { IconCalendar } from "@tabler/icons-react"
import { format, parseISO, startOfDay } from "date-fns"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TASK_STATUSES, type Task, type TaskStatus } from "@/lib/task-store"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"

const taskFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().default(""),
  status: z.enum(["Pending", "In Progress", "Completed"]),
  dueDate: z.string().min(1, "Due date is required"),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

interface TaskFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  onSubmit: (values: Omit<Task, "id">) => void
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
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "Pending",
      dueDate: task?.dueDate ?? "",
    },
  })

  const dueDate = watch("dueDate")
  const [datePickerOpen, setDatePickerOpen] = useState(false)
  const today = startOfDay(new Date())

  const onFormSubmit = (data: TaskFormValues) => {
    onSubmit(data)
    onOpenChange(false)
    toast.success(
      `Task "${data.title}" ${task ? "updated" : "added"} successfully`
    )
  }

  const isSubmitDisabled = task ? !isDirty : false

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-5">
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
          {...register("title")}
          aria-invalid={!!errors.title}
          placeholder="e.g. Write project proposal"
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="task-description">Description</Label>
        <Textarea
          id="task-description"
          {...register("description")}
          placeholder="Add more detail (optional)"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="task-status">Status</Label>
          <Select
            value={watch("status")}
            onValueChange={(value) => setValue("status", value as TaskStatus)}
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
                  setValue("dueDate", format(date, "yyyy-MM-dd"))
                  setDatePickerOpen(false)
                }}
                disabled={{ before: today }}
                defaultMonth={dueDate ? parseISO(dueDate) : today}
                autoFocus
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && (
            <p className="text-sm text-destructive">{errors.dueDate.message}</p>
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
        <Button type="submit" disabled={isSubmitDisabled}>
          {task ? "Save Changes" : "Add Task"}
        </Button>
      </DialogFooter>
    </form>
  )
}

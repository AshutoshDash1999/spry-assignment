"use client"

import { motion } from "motion/react"
import { IconCalendar, IconPencil, IconTrash } from "@tabler/icons-react"
import { format, isBefore, parseISO, startOfDay } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Task, TaskStatus } from "@/lib/task-store"

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
}

const statusBadgeVariant: Record<
  TaskStatus,
  "pending" | "in-progress" | "completed"
> = {
  Pending: "pending",
  "In Progress": "in-progress",
  Completed: "completed",
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
} as const

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isOverdue =
    task.status !== "Completed" &&
    isBefore(parseISO(task.dueDate), startOfDay(new Date()))

  return (
    <motion.div variants={item}>
      <Card className="h-full transition-shadow hover:ring-foreground/20">
      <div className="flex h-full flex-col justify-between gap-2">
        <div>
          <CardHeader>
            <CardTitle className="pr-2">{task.title}</CardTitle>
            <CardAction>
              <Badge variant={statusBadgeVariant[task.status]}>
                {task.status}
              </Badge>
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {task.description ? (
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {task.description}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No description
              </p>
            )}
            <div className="flex items-center gap-2">
              <div
                className={
                  isOverdue
                    ? "flex items-center gap-1.5 text-sm text-destructive"
                    : "flex items-center gap-1.5 text-sm text-muted-foreground"
                }
              >
                <IconCalendar className="size-4" />
                {format(parseISO(task.dueDate), "MMM d, yyyy")}
              </div>
              {isOverdue && <Badge variant="overdue">Overdue</Badge>}
            </div>
          </CardContent>
        </div>

        <CardFooter className="gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(task)}>
            <IconPencil data-icon="inline-start" />
            Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => onDelete(task)}
          >
            <IconTrash data-icon="inline-start" />
            Delete
          </Button>
        </CardFooter>
      </div>
    </Card>
    </motion.div>
  )
}

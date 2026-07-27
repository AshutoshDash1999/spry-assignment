"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "@/lib/task-store"

interface TaskSummaryProps {
  tasks: Task[]
}

export function TaskSummary({ tasks }: TaskSummaryProps) {
  const pending = tasks.filter((t) => t.status === "Pending").length
  const inProgress = tasks.filter((t) => t.status === "In Progress").length
  const completed = tasks.filter((t) => t.status === "Completed").length

  const stats = [
    { label: "Total Tasks", count: tasks.length, dot: "bg-foreground/40" },
    { label: "Pending", count: pending, dot: "bg-amber-500" },
    { label: "In Progress", count: inProgress, dot: "bg-blue-500" },
    { label: "Completed", count: completed, dot: "bg-emerald-500" },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardContent className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className={`size-2 rounded-full ${stat.dot}`} />
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <span className="text-3xl font-bold">{stat.count}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

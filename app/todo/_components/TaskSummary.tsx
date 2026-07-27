"use client"

import { motion } from "motion/react"

import { Card, CardContent } from "@/components/ui/card"
import type { Task } from "@/lib/task-store"

interface TaskSummaryProps {
  tasks: Task[]
}

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const item = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
} as const

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
    <motion.div
      className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat) => (
        <motion.div key={stat.label} variants={item}>
          <Card size="sm">
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
        </motion.div>
      ))}
    </motion.div>
  )
}

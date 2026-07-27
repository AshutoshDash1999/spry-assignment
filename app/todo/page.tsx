"use client"

import { IconClipboardList } from "@tabler/icons-react"
import { compareAsc, parseISO } from "date-fns"
import { motion } from "motion/react"
import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { useTaskStore, type Task, type TaskStatus } from "@/lib/task-store"
import { DeleteTaskDialog } from "./_components/DeleteTaskDialog"
import { TaskCard } from "./_components/TaskCard"
import { TaskFilterSortBar } from "./_components/TaskFilterSortBar"
import { TaskFormDialog } from "./_components/TaskFormDialog"
import { TaskSummary } from "./_components/TaskSummary"

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

export default function TodoPage() {
  const tasks = useTaskStore((s) => s.tasks)
  const addTask = useTaskStore((s) => s.addTask)
  const updateTask = useTaskStore((s) => s.updateTask)
  const deleteTask = useTaskStore((s) => s.deleteTask)

  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | "All">(
    "All"
  )
  const [sortBy, setSortBy] = useState<"asc" | "desc">("asc")
  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  const handleStatusChange = (status: string | null) => {
    setSelectedStatus((status as TaskStatus | "All") ?? "All")
  }

  const handleSortChange = (sort: string | null) => {
    setSortBy((sort as "asc" | "desc") ?? "asc")
  }

  const handleAddClick = () => {
    setEditingTask(undefined)
    setFormOpen(true)
  }

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setFormOpen(true)
  }

  const handleFormSubmit = (values: Omit<Task, "id">) => {
    if (editingTask) {
      updateTask(editingTask.id, values)
    } else {
      addTask(values)
    }
  }

  const handleConfirmDelete = (task: Task) => {
    deleteTask(task.id)
    setDeletingTask(null)
  }

  const filteredAndSortedTasks = useMemo(() => {
    return tasks
      .filter((t) => selectedStatus === "All" || t.status === selectedStatus)
      .sort((a, b) => {
        const diff = compareAsc(parseISO(a.dueDate), parseISO(b.dueDate))
        return sortBy === "asc" ? diff : -diff
      })
  }, [tasks, selectedStatus, sortBy])

  return (
    <div className="bg-background">
      <TaskFilterSortBar
        selectedStatus={selectedStatus}
        sortBy={sortBy}
        onStatusChange={handleStatusChange}
        onSortChange={handleSortChange}
        onAddClick={handleAddClick}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold">Tasks</h1>

        <TaskSummary tasks={tasks} />

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-12 text-center">
            <IconClipboardList className="size-10 text-muted-foreground" />
            <div>
              <p className="font-medium">No tasks yet</p>
              <p className="text-sm text-muted-foreground">
                Create your first task to get started.
              </p>
            </div>
            <Button onClick={handleAddClick}>Add Task</Button>
          </div>
        ) : filteredAndSortedTasks.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card p-12 text-center">
            <p className="text-muted-foreground">
              No tasks match the selected filter.
            </p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {filteredAndSortedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEditClick}
                onDelete={setDeletingTask}
              />
            ))}
          </motion.div>
        )}
      </main>

      <TaskFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        task={editingTask}
        onSubmit={handleFormSubmit}
      />

      <DeleteTaskDialog
        task={deletingTask}
        onOpenChange={(open) => !open && setDeletingTask(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  )
}

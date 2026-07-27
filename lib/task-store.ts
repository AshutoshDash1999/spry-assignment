import { create } from "zustand"
import { persist } from "zustand/middleware"
import { addDays, format, subDays } from "date-fns"

export type TaskStatus = "Pending" | "In Progress" | "Completed"

export interface Task {
  id: string
  title: string
  description: string
  status: TaskStatus
  dueDate: string
}

export const TASK_STATUSES: TaskStatus[] = [
  "Pending",
  "In Progress",
  "Completed",
]

const today = new Date()

const seedTasks: Task[] = [
  {
    id: "seed-1",
    title: "Design dashboard wireframes",
    description:
      "Sketch the layout for the new task dashboard, including the summary cards and filter bar.",
    status: "Completed",
    dueDate: format(subDays(today, 5), "yyyy-MM-dd"),
  },
  {
    id: "seed-2",
    title: "Set up project repository",
    description:
      "Initialize the repo, configure linting and formatting, and push the first commit.",
    status: "Completed",
    dueDate: format(subDays(today, 3), "yyyy-MM-dd"),
  },
  {
    id: "seed-3",
    title: "Implement task CRUD API",
    description:
      "Wire up add, edit, and delete actions for tasks with local persistence.",
    status: "In Progress",
    dueDate: format(addDays(today, 1), "yyyy-MM-dd"),
  },
  {
    id: "seed-4",
    title: "Write onboarding documentation",
    description: "",
    status: "Pending",
    dueDate: format(addDays(today, 4), "yyyy-MM-dd"),
  },
  {
    id: "seed-5",
    title: "Review pull requests",
    description:
      "Go through open PRs from the team and leave feedback before the sprint ends.",
    status: "Pending",
    dueDate: format(subDays(today, 1), "yyyy-MM-dd"),
  },
  {
    id: "seed-6",
    title: "Plan next sprint",
    description:
      "Groom the backlog and estimate stories for the upcoming sprint planning meeting.",
    status: "Pending",
    dueDate: format(addDays(today, 10), "yyyy-MM-dd"),
  },
]

interface TaskStore {
  tasks: Task[]
  addTask: (task: Omit<Task, "id">) => void
  updateTask: (id: string, updates: Omit<Task, "id">) => void
  deleteTask: (id: string) => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: seedTasks,
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: crypto.randomUUID() }],
        })),
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),
    }),
    { name: "task-store" }
  )
)

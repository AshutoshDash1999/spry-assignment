"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Task } from "@/lib/task-store"

interface DeleteTaskDialogProps {
  task: Task | null
  onOpenChange: (open: boolean) => void
  onConfirm: (task: Task) => void
}

export function DeleteTaskDialog({
  task,
  onOpenChange,
  onConfirm,
}: DeleteTaskDialogProps) {
  return (
    <Dialog open={!!task} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Task</DialogTitle>
          <DialogDescription>
            This will permanently delete the task &quot;{task?.title}&quot;.
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => task && onConfirm(task)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

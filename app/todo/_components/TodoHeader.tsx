"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select"
import { useRouter } from "next/navigation"

export function TodoHeader() {
  const router = useRouter()

  const handleAppChange = (value: string | null) => {
    if (value) router.push(value)
  }

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">Spry</span>
            <Select
              value="/todo"
              onValueChange={handleAppChange}
            >
              <SelectTrigger className="h-auto w-fit gap-1 border-0 px-4 py-2 hover:opacity-80">
                <span>Todo</span>
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="/">Ecommerce</SelectItem>
                <SelectItem value="/todo">Todo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import { Header } from "../_components/Header"

export default function TodoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="mb-6 text-3xl font-bold">Todo</h1>
        <p className="text-muted-foreground">Todo app coming soon...</p>
      </main>
    </div>
  )
}

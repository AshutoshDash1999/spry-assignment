import { create } from "zustand"
import { persist } from "zustand/middleware"

interface FavoritesStore {
  favorites: Set<number>
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (id: number) => void
  isFavorited: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: new Set(),
      addFavorite: (id) =>
        set((state) => {
          const newSet = new Set(state.favorites)
          newSet.add(id)
          return { favorites: newSet }
        }),
      removeFavorite: (id) =>
        set((state) => {
          const newSet = new Set(state.favorites)
          newSet.delete(id)
          return { favorites: newSet }
        }),
      toggleFavorite: (id) => {
        const { favorites } = get()
        if (favorites.has(id)) {
          get().removeFavorite(id)
        } else {
          get().addFavorite(id)
        }
      },
      isFavorited: (id) => get().favorites.has(id),
    }),
    {
      name: "favorites-store",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name)
          if (!item) return null
          const parsed = JSON.parse(item)
          return {
            state: {
              ...parsed.state,
              favorites: new Set(parsed.state.favorites),
            },
            version: parsed.version,
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify({
              state: {
                ...value.state,
                favorites: Array.from(value.state.favorites),
              },
              version: value.version,
            })
          )
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
)

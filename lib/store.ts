import { create } from "zustand"

interface FavoritesStore {
  favorites: Set<number>
  addFavorite: (id: number) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (id: number) => void
  isFavorited: (id: number) => boolean
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
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
}))

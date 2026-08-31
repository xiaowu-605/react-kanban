import { create } from 'zustand'

interface Board {
  id: string
  name: string
}
export const useKanban = create<{
  boards: Board[]
  createBooard: (board: Board) => void
}>((set) => ({
  boards: [],
  createBooard: (board) =>
    set((state) => ({ boards: [...state.boards, board] })),
}))

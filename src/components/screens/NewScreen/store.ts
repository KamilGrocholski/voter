import create from 'zustand'
import { PickVoteItem } from './types'

interface State {
    isCreatorOpen: boolean

    name: string | undefined
    image: string | undefined

    items: PickVoteItem[]
}

interface Actions { 
    setIsCreatorOpen: (bool: boolean) => void

    setName: (name: string) => void
    setImage: (image: string) => void

    addItem: (item: PickVoteItem) => void
    removeItem: (index: number) => void
    editItem: (index: number, editedFields: Partial<PickVoteItem>) => void
}

export const useNewVoteSetStore = create<State & Actions>(set => ({
    isCreatorOpen: false,
    setIsCreatorOpen: (bool) => set(() => ({ isCreatorOpen: bool })),

    name: undefined,
    image: undefined,
    items: [],

    setName: (name) => set(() => ({ name })),
    setImage: (image) => set(() => ({ image })),

    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
    editItem: (index, editedFields) => set((state) => ({ items: state.items.map((item, i) => i === index ? { ...item, editedFields } : item) })),
}))
import create from 'zustand'
import { PickVoteItem } from './types'

interface State {
    isCreatorOpen: boolean
    isCreatorStateOpen: boolean
    isLoading: boolean
    isError: boolean
    error?: string

    name: string | undefined
    image: string | undefined

    items: PickVoteItem[]
}

interface Actions { 
    setIsCreatorOpen: (bool: boolean) => void
    setIsCreatorStateOpen: (bool: boolean) => void
    setIsLoading: (bool: boolean) => void 
    setIsError: (bool: boolean) => void
    setError: (str?: string) => void

    setName: (name: string) => void
    setImage: (image: string) => void

    addItem: (item: PickVoteItem) => void
    removeItem: (index: number) => void
    editItem: (index: number, editedFields: Partial<PickVoteItem>) => void

    resetStore: () => void
}

export const useNewVoteSetStore = create<State & Actions>(set => ({
    isCreatorOpen: false,
    setIsCreatorOpen: (bool) => set(() => ({ isCreatorOpen: bool })),
    isCreatorStateOpen: false,
    setIsCreatorStateOpen: (bool) => set(() => ({ isCreatorStateOpen: bool })),
    isLoading: false,
    setIsLoading: (bool) => set(() => ({ isLoading: bool })),
    isError: false,
    setIsError: (bool) => set(() => ({ isError: bool })),
    error: undefined,
    setError: (error) => set(() => ({ error })),

    name: undefined,
    image: undefined,
    items: [],

    setName: (name) => set(() => ({ name })),
    setImage: (image) => set(() => ({ image })),

    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
    editItem: (index, editedFields) => set((state) => ({ items: state.items.map((item, i) => i === index ? { ...item, editedFields } : item) })),

    resetStore: () => set(() => ({
        name: undefined,
        image: undefined,
        items: [],
        isCreatorOpen: false,
        isCreatorStateOpen: false,
        isLoading: false,
        isError: false,
        error: undefined,
    }))
}))
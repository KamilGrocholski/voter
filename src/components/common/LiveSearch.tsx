import React, { useEffect, useState } from "react"
import { trpc } from "../../utils/trpc"

interface LiveSearchProps<T> {
    onSelect: (suggestion: T) => string
    renderSuggestion: (suggestion: T) => JSX.Element
}

export const LiveSearch = <T,>({
    renderSuggestion,
    onSelect,
}: LiveSearchProps<T>): JSX.Element => {
    const [query, setQuery] = useState<string>('')
    const [focusIndex, setFocusIndex] = useState<number>(-1)
    const [suggestions, setSuggestions] = useState<T[]>([])
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
    const nameSuggestionsQuery = trpc.voteSet.getNamesPublic.useQuery(query, {
        onSuccess: (suggestions) => setSuggestions(suggestions as T[])
    })

    useEffect(() => {
        if (query === '') {
            setShowSuggestions(false)
        } else {
            nameSuggestionsQuery.refetch()
            setShowSuggestions(true)
        }
    }, [query])

    const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setQuery(value ?? '')
    }

    const handleSelect = (index: number) => {
        const selectedSuggestion = suggestions[index]
        selectedSuggestion && setQuery(onSelect(selectedSuggestion))
    }

    const handleBlur = () => {
        setShowSuggestions(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = e
        switch (key) {
            case 'ArrowDown':
                e.preventDefault()
                setFocusIndex(prev => Math.min(prev + 1, suggestions.length - 1))
                break
            case 'ArrowUp':
                e.preventDefault()
                setFocusIndex(prev => Math.max(prev - 1, -1))
                break
            case 'Enter':
                handleSelect(focusIndex)
                break
            case 'Escape':
                setShowSuggestions(false)
                setFocusIndex(-1)
                break
        }
    }

    return (
        <div>
            <input
                type='text'
                value={query ?? ''}
                onChange={handleSetQuery}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            />
            {showSuggestions ?
                <div tabIndex={1}>
                    {suggestions.map((suggestion, i) => (
                        <div
                            key={i}
                        >
                            {renderSuggestion(suggestion)}
                        </div>
                    ))}
                </div> : null}
        </div>
    )
}

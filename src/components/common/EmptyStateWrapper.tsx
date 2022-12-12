import { ReactNode } from "react"

interface StateWrapperProps {
    isLoading: boolean
    data: unknown
    NonEmptyComponent: ReactNode
    EmptyComponent: ReactNode
    // isError: boolean
    // error?: string
}

const EmptyStateWrapper: React.FC<StateWrapperProps> = ({
    isLoading,
    data,
    NonEmptyComponent,
    EmptyComponent
}) => {
    if (isLoading) return <div>Loading...</div>

    if (Array.isArray(data) && data.length < 1) return <>{EmptyComponent}</>

    if (!data) return <>{EmptyComponent}</>

    return <>{NonEmptyComponent}</>
}

export default EmptyStateWrapper
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
    return (
        <>
            {isLoading
                ? <div>Loading...</div>
                : Array.isArray(data) && data.length < 1
                    ? <>{EmptyComponent}</>
                    : !data
                        ? <>{EmptyComponent}</>
                        : <>{NonEmptyComponent}</>}
        </>
    )
}

export default EmptyStateWrapper
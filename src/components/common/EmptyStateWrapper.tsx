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
            {isLoading ?

            (<div>
                Loading...
            </div>) :

            data ?

            (NonEmptyComponent) :

            (EmptyComponent)}
        </>
    )
}

export default EmptyStateWrapper
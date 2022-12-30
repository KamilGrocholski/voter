import { ReactNode } from "react"
import { Loader } from "./Loader"

interface StateWrapperProps<T> {
    isLoading: boolean
    isError: boolean
    data: T
    NonEmptyComponent: (data: NonNullable<T>) => JSX.Element
    EmptyComponent?: ReactNode
    LoadingComponent?: ReactNode
    ErrorComponent?: ReactNode
}

const EmptyStateWrapper = <T,>({
    isLoading,
    isError,
    data,
    NonEmptyComponent,
    EmptyComponent,
    LoadingComponent,
    ErrorComponent
}: StateWrapperProps<T>): JSX.Element => {
    if (isLoading) return <>{LoadingComponent ?? DefaultLoading}</>

    if (isError) return <>{ErrorComponent ?? DefaultError}</>

    if (Array.isArray(data) && data.length < 1) return <>{EmptyComponent ?? DefaultEmpty}</>

    if (data === null || data === undefined) return <>{EmptyComponent ?? DefaultEmpty}</>

    return NonEmptyComponent(data)
}

export default EmptyStateWrapper


const defaultStateComponentStyle = 'mx-auto flex items-center justify-center'

const DefaultLoading = <div className={defaultStateComponentStyle}><Loader /></div>
const DefaultError = <div className={defaultStateComponentStyle}>Error</div>
const DefaultEmpty = <div className={defaultStateComponentStyle}>There is nothing to display.</div> 
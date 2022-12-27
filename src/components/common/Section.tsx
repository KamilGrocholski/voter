export const Section: React.FC<{
    title: string
    children: JSX.Element | JSX.Element[]
}> = ({
    title,
    children
}) => {
        return (
            <section className='flex flex-col mb-5'>
                <h1>{title}</h1>
                <div>{children}</div>
            </section>
        )
    }

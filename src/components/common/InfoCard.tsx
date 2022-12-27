export const InfoCard: React.FC<{
    title: string
    children: JSX.Element | JSX.Element[]
}> = ({
    title,
    children
}) => {
        return (
            <div className='brd-normal p-3'>
                <h2>{title}</h2>
                <div>
                    {children}
                </div>
            </div>
        )
    }
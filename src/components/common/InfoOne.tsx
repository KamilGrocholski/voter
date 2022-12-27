export const InfoOne: React.FC<{
    title: string
    image?: JSX.Element
    value: string | number | Date
}> = ({
    title,
    value,
    image
}) => {
        return (
            <div className='brd-dashed p-3'>
                <div className='flex flex-row justify-between'>
                    <div>IMG</div>
                    <div>{value.toString()}</div>
                </div>
                <h3>{title}</h3>
            </div>
        )
    }
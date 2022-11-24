interface Props {
    handleSkip: () => void
    isDisabled: boolean
}

const SkipBtn: React.FC<Props> = ({
    handleSkip,
    isDisabled
}) => {
    return (
        <button
            onClick={handleSkip}
            disabled={isDisabled}
            className='flex flex-row space-x-3 border px-3 py-1 rounded-md'
        >
            <span>Skip</span>
            {/* <span> - NEXT - </span> */}
        </button>
    )
}

export default SkipBtn
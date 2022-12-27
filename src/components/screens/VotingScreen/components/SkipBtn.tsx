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
            className='flex flex-row space-x-3 btn text-lg w-24 items-center justify-center'
        >
            <span>Skip</span>
            {/* <span> - NEXT - </span> */}
        </button>
    )
}

export default SkipBtn
import { Transition } from "@headlessui/react"

interface Props {
    handleSkip: () => void
    isDisabled: boolean
}

const SkipBtn: React.FC<Props> = ({
    handleSkip,
    isDisabled
}) => {
    return (
        <Transition.Child
            enter="transition-opacity duration-400"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-400"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <button
                onClick={handleSkip}
                disabled={isDisabled}
                className='flex flex-row space-x-3 btn text-lg w-24 items-center justify-center'
            >
                <span>Skip</span>
                {/* <span> - NEXT - </span> */}
            </button>
        </Transition.Child>
    )
}

export default SkipBtn
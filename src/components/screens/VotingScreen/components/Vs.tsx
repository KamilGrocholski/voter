import { Transition } from "@headlessui/react"

export const Vs = () => {
    return (
        <Transition.Child
            enter="transition-opacity duration-400"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-400"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <span className='text-xl text-center'>Vs.</span>
        </Transition.Child>
    )
}

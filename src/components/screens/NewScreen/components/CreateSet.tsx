import { useRouter } from "next/router"
import { trpc } from "../../../../utils/trpc"
import { useNewVoteSetStore } from "../store"

const Create: React.FC = () => {
    const { push } = useRouter()
    const { name, image, items, setIsLoading, setIsError, setError, isError, error: errorSetCreation, setIsCreatorStateOpen, resetStore } = useNewVoteSetStore()

    const { mutate: createSet, isLoading, error } = trpc.voteSet.create.useMutation({
        onSuccess: () => {
            push('/dashboard')
            resetStore()
        },
        onError: () => {
            setIsError(true)
            setError(error?.message)
            setIsCreatorStateOpen(true)
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    const handleCreateVoteSet = async () => {
        if (!name || !image) return

        createSet({ name, image, items })
    }

    return (
        <>
            <button
                className='border rounded-md w-24 h-8 mx-auto items-center'
                onClick={handleCreateVoteSet}
                disabled={isLoading}
            >
                Create
            </button>
            {isError ? <div>{errorSetCreation}</div> : null}
        </>
    )
}

export default Create
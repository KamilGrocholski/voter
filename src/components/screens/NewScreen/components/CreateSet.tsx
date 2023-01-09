import { TRPCError } from "@trpc/server"
import { useRouter } from "next/router"
import { trpc } from "../../../../utils/trpc"
import { useNewVoteSetStore } from "../store"

const Create: React.FC = () => {
    const { push } = useRouter()
    const name = useNewVoteSetStore(state => state.name)
    const image = useNewVoteSetStore(state => state.image)
    const items = useNewVoteSetStore(state => state.items)
    const setIsLoading = useNewVoteSetStore(state => state.setIsLoading)
    const setIsError = useNewVoteSetStore(state => state.setIsError)
    const setError = useNewVoteSetStore(state => state.setError)
    const setIsCreatorStateOpen = useNewVoteSetStore(state => state.setIsCreatorStateOpen)
    const resetStore = useNewVoteSetStore(state => state.resetStore)

    const utils = trpc.useContext()

    const { mutate: createSet, isLoading } = trpc.voteSet.create.useMutation({
        onSuccess: () => {
            push('/dashboard')
            resetStore()
            utils.voteSet.getVoteSets.invalidate()
        },
        onError: (error) => {
            setIsError(true)
            if (error instanceof TRPCError) {
                setError(error.message)
            }
            setIsCreatorStateOpen(true)
        },
        onSettled: () => {
            setIsLoading(false)
        }
    })

    const handleCreateVoteSet = async () => {
        if (!name || !image) return

        setIsLoading(true)
        createSet({ name, image, items })
    }

    return (
        <>
            <button
                className='h-8 btn btn-normal'
                onClick={handleCreateVoteSet}
                disabled={isLoading}
            >
                {isLoading ? 'Creating...' : 'Create'}
            </button>
        </>
    )
}

export default Create
import { useRouter } from "next/router"
import { trpc } from "../../../../utils/trpc"
import { useNewVoteSetStore } from "../store"

const Create: React.FC = () => {
    const { push } = useRouter()
    const { name, image, items } = useNewVoteSetStore()

    const { mutate: createSet, isLoading } = trpc.voteSet.create.useMutation({
        onSuccess: () => push('/dashboard')
    })

    const handleCreateVoteSet = () => {
        if (!name || !image) return 
        createSet({ name, image, items })
    }

    return (
        <button 
            className='border rounded-md w-24 h-8 mx-auto items-center'
            onClick={ handleCreateVoteSet }
            disabled={isLoading}
        >
            Create
        </button>
    )
}

export default Create
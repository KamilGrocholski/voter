import { VoteSet } from "@prisma/client"
import { useState } from "react"
import { MyVoteSetByIdProtected } from "../../../../types/trpcOutputTypes"
import ItemsRanking from "./ItemsList"
import NewItemCreationModal from "./NewItemCreationModal"

export const Items: React.FC<{
    items: MyVoteSetByIdProtected['voteItems']
    voteSetId: VoteSet['id']
}> = ({
    items,
    voteSetId
}) => {
        const [isCreatorOpen, setIsCreatorOpen] = useState<boolean>(false)

        return (
            <div className='container mx-auto mt-12 px-3 lg:px-0 mb-12'>
                <NewItemCreationModal
                    voteSetId={voteSetId}
                    isCreatorOpen={isCreatorOpen}
                    setIsCreatorOpen={setIsCreatorOpen}
                />
                <div className='flex flex-row justify-between w-full'>
                    <div className='flex flex-row items-center'>
                        <span>{items.length}</span>
                        <span>/255</span>
                    </div>
                    <button
                        onClick={() => setIsCreatorOpen(true)}
                        className='btn'
                        disabled={items.length >= 255}
                    >
                        <span className="flex flex-row space-x-3">
                            <span>Create a new item</span>
                        </span>
                    </button>
                </div>
                <ItemsRanking items={items} />
            </div>
        )
    }

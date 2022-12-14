import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsPagination from "../../common/VoteSetCardPublic/Pagination"

const VotesSetsPaginationScreen: React.FC = () => {
    const infinityVotesSets = trpc.voteSet.pagination.useInfiniteQuery({ take: 6 }, { getNextPageParam: (lastPage) => lastPage.nextCursor })
    const [page, setPage] = useState<number>(0)

    const handleFetchNextPage = async () => {
        await infinityVotesSets.fetchNextPage()
        setPage(prevPage => infinityVotesSets.hasNextPage ? prevPage + 1 : prevPage)
    }

    const handleFetchPrevPage = () => {
        setPage(prevPage => prevPage === 0 ? prevPage : prevPage - 1)
    }

    return (
        <MainLayout useContainer={true}>
            <EmptyStateWrapper
                isLoading={infinityVotesSets.isLoading}
                data={infinityVotesSets.data}
                NonEmptyComponent={
                    <>
                        <VotesSetsPagination
                            votesSets={infinityVotesSets.data?.pages[page]?.voteSets ?? []}
                        />
                        <div className='flex flex-row space-x-3 items-center justify-center mt-12'>
                            <button className='px-2 py-1 w-24 border-1 border rounded-md' onClick={handleFetchPrevPage}>Prev</button>
                            <div>{page + 1}</div>
                            <button className='px-2 py-1 w-24 border-1 border rounded-md' onClick={handleFetchNextPage}>Next</button>
                        </div>
                    </>
                }
                EmptyComponent={<div>There are no vote sets.</div>}
            />
        </MainLayout>
    )
}

export default VotesSetsPaginationScreen
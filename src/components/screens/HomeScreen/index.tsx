import { useEffect, useState } from "react"
import { useVoteSetsFilter } from "../../../hooks/use-vote-sets-filter"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsPagination from "../../common/VoteSetCardPublic/Pagination"
import { VoteSetsFilter } from "../../common/VoteSetsFilter"

const HomeScreen = () => {
    const filter = useVoteSetsFilter({})
    const getVoteSetsInfiniteQuery = trpc.voteSet.getVoteSets.useInfiniteQuery(
        {
            take: 6,
            ...filter.parse()
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
            keepPreviousData: true,
            staleTime: 100000
        },
    )

    const [page, setPage] = useState<number>(0)

    useEffect(() => setPage(0), [filter.time])

    const handleFetchNextPage = () => {
        setPage(prev => {
            if (getVoteSetsInfiniteQuery.data?.pages.length && getVoteSetsInfiniteQuery.data?.pages.length !== 0) {
                if (page === getVoteSetsInfiniteQuery.data.pages.length - 1) {
                    if (getVoteSetsInfiniteQuery.hasNextPage) {
                        getVoteSetsInfiniteQuery.fetchNextPage()
                        return prev + 1
                    }
                    return prev
                } else {
                    return prev + 1
                }
            }
            return prev + 1
        })
    }

    const handleFetchPrevPage = () => {
        setPage(prev => prev > 0 ? prev - 1 : prev)
    }

    return (
        <MainLayout useContainer={false}>
            <VoteSetsFilter {...filter} />
            <div className='container mx-auto flex flex-col space-y-8'>
                <EmptyStateWrapper
                    isError={getVoteSetsInfiniteQuery.isError}
                    isLoading={getVoteSetsInfiniteQuery.isLoading}
                    data={getVoteSetsInfiniteQuery.data}
                    NonEmptyComponent={(voteSetsPages) =>
                        <>
                            <VotesSetsPagination
                                votesSets={voteSetsPages.pages[page]?.voteSets ?? []}
                            />
                            <div className='flex flex-row space-x-3 items-center justify-center mt-12'>
                                <button
                                    className='w-24 btn'
                                    onClick={handleFetchPrevPage}
                                >
                                    Prev
                                </button>
                                <div>{page + 1}</div>
                                <button
                                    className='w-24 btn'
                                    onClick={handleFetchNextPage}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    }
                    EmptyComponent={<div>There are no vote sets.</div>}
                />
            </div>
        </MainLayout>
    )
}

export default HomeScreen
import { useState } from "react"
import { useVoteSetsFilter } from "../../../hooks/use-vote-sets-filter"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsPagination from "../../common/VoteSetCardPublic/Pagination"
import { VoteSetsFilter } from "../../common/VoteSetsFilter"
import HeroSection from "./components/HeroSection"

const HomeScreen = () => {
    const filter = useVoteSetsFilter({})
    const getVoteSetsInfiniteQuery = trpc.voteSet.getVoteSets.useInfiniteQuery(
        {
            take: 2,
            ...filter.parse()
        },
        {
            getNextPageParam: (lastPage) => lastPage.nextCursor,
        },
    )

    const [page, setPage] = useState<number>(0)

    const handleFetchNextPage = () => {
        getVoteSetsInfiniteQuery.fetchNextPage()
        setPage(prev => getVoteSetsInfiniteQuery.data?.pages.length && getVoteSetsInfiniteQuery.data.pages.length - 1 > prev ? prev + 1 : prev)
    }

    const handleFetchPrevPage = () => {
        getVoteSetsInfiniteQuery.fetchPreviousPage()
        setPage(prev => prev > 0 ? prev - 1 : prev)
    }


    return (
        <MainLayout useContainer={false}>
            <HeroSection />
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
                                <button className='w-24 btn' onClick={handleFetchPrevPage}>Prev</button>
                                <div>{page + 1}</div>
                                <button className='w-24 btn' onClick={handleFetchNextPage}>Next</button>
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
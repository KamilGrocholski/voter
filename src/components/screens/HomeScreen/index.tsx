import { useVoteSetsFilter } from "../../../hooks/use-vote-sets-filter"
import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsList from "../../common/VoteSetCardPublic/List"
import { VoteSetsFilter } from "../../common/VoteSetsFilter"
import HeroSection from "./components/HeroSection"

const HomeScreen = () => {
    const filter = useVoteSetsFilter({})
    const getVoteSetsQuery = trpc.voteSet.getVoteSets.useQuery(filter.parse())

    return (
        <MainLayout useContainer={false}>
            <HeroSection />
            <VoteSetsFilter {...filter} />
            <div className='container mx-auto flex flex-col space-y-8'>
                <EmptyStateWrapper
                    isError={getVoteSetsQuery.isError}
                    isLoading={getVoteSetsQuery.isLoading}
                    data={getVoteSetsQuery.data}
                    NonEmptyComponent={(voteSets) => <VotesSetsList votesSets={voteSets} />}
                    EmptyComponent={<div>There are no vote sets.</div>}
                />
            </div>
        </MainLayout>
    )
}

export default HomeScreen
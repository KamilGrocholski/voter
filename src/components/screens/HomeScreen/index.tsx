import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsList from "../../common/VoteSetCardPublic/List"
import HeroSection from "./components/HeroSection"

const HomeScreen = () => {
    const { data: recentlyPopularVoteSets, isLoading, isError } = trpc.voteSet.getRecentlyPopular.useQuery()

    return (
        <MainLayout useContainer={false}>
            <HeroSection />
            <div className='container mx-auto flex flex-col space-y-8'>
                <h2>Recently popular</h2>
                <EmptyStateWrapper
                    isError={isError}
                    isLoading={isLoading}
                    data={recentlyPopularVoteSets}
                    NonEmptyComponent={recentlyPopularVoteSets => <VotesSetsList votesSets={recentlyPopularVoteSets} />}
                    EmptyComponent={<div>There are no vote sets.</div>}
                />
            </div>
        </MainLayout>
    )
}

export default HomeScreen
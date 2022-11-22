import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsList from "../../common/VoteSetCardPublic/List"
import HeroSection from "./components/HeroSection"

const HomeScreen = () => {
    const { data: recentlyPopularVoteSets, isLoading } = trpc.voteSet.getRecentlyPopular.useQuery() 

    return (
        <MainLayout useContainer={ false }>
            <HeroSection />
            <div className='container mx-auto flex flex-col space-y-8'>
                <div className='text-2xl font-semibold'>Recently popular</div>
                <EmptyStateWrapper 
                    isLoading={isLoading}
                    data={recentlyPopularVoteSets}
                    NonEmptyComponent={<VotesSetsList votesSets={recentlyPopularVoteSets ?? []} />}
                    EmptyComponent={<div>Loading...</div>}
                />
            </div>
        </MainLayout>
    )
}

export default HomeScreen
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import { User } from "@prisma/client"
import UserInfo from "./components/UserInfo"
import { useRouter } from "next/router"
import VotesSetsList from "../../common/VoteSetCardPublic/List"

const UserProfileScreen: React.FC = () => {
    const router = useRouter()
    const { userId } = router.query as { userId: User['id'] }
    const { data: user, isLoading: isLoadingUserInfo } = trpc.user.getSmallInfoByIdPublic.useQuery({ id: userId })
    const { data: voteSets, isLoading: isLoadingVoteSets } = trpc.voteSet.getAllByUserIdPublic.useQuery(userId)

    return (
        <div className='flex flex-col space-y-5'>
            <EmptyStateWrapper
                data={user}
                isLoading={isLoadingUserInfo}
                NonEmptyComponent={
                    <>
                        <UserInfo
                            image={user?.image as string}
                            name={user?.name as string}
                            role={user?.role as string}
                        />
                    </>
                }
                EmptyComponent={<div>No data is avaible.</div>}
            />
            <EmptyStateWrapper
                data={voteSets}
                isLoading={isLoadingVoteSets}
                NonEmptyComponent={
                    <>
                        <VotesSetsList votesSets={voteSets ?? []} />
                    </>
                }
                EmptyComponent={<div>elo</div>}
            />
        </div>
    )
}

export default UserProfileScreen
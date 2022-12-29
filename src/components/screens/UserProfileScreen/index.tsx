import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import { User } from "@prisma/client"
import UserInfo from "./components/UserInfo"
import { useRouter } from "next/router"
import VotesSetsList from "../../common/VoteSetCardPublic/List"

const UserProfileScreen: React.FC = () => {
    const router = useRouter()
    const { userId } = router.query as { userId: User['id'] }
    const userQuery = trpc.user.getSmallInfoByIdPublic.useQuery({ id: userId })
    const { data: voteSets, isLoading: isLoadingVoteSets, isError: isErrorVoteSets } = trpc.voteSet.getAllByUserIdPublic.useQuery(userId)

    return (
        <div className='flex flex-col space-y-5'>
            <EmptyStateWrapper
                data={userQuery.data}
                isLoading={userQuery.isLoading}
                isError={userQuery.isError}
                NonEmptyComponent={(user) =>
                    <>
                        <UserInfo
                            image={user.image as string}
                            name={user.name as string}
                            role={user.role as string}
                        />
                    </>
                }
                EmptyComponent={<div>No data is avaible.</div>}
            />
            <EmptyStateWrapper
                data={voteSets}
                isError={isErrorVoteSets}
                isLoading={isLoadingVoteSets}
                NonEmptyComponent={(voteSets) => (
                    <>
                        <VotesSetsList votesSets={voteSets ?? []} />
                    </>
                )}
                EmptyComponent={<div>elo</div>}
            />
        </div>
    )
}

export default UserProfileScreen
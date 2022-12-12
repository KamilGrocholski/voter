import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import { User } from "@prisma/client"
import UserInfo from "./components/UserInfo"

const UserProfileScreen: React.FC<{ userId: User['id'] }> = ({
    userId
}) => {
    const { data: user, isLoading } = trpc.user.getSmallInfoByIdPublic.useQuery({ id: userId })

    return (
        <EmptyStateWrapper
            data={user}
            isLoading={isLoading}
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
    )
}

export default UserProfileScreen
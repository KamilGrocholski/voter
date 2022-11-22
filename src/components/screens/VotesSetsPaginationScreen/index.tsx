import { VoteSet } from "@prisma/client"
import { useState } from "react"
import MainLayout from "../../../layouts/MainLayout"
import { VotesSetsPagination } from "../../../types/trpcOutputTypes"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import VotesSetsList from "../../common/VoteSetCardPublic/List"

const VotesSetsPaginationScreen: React.FC = () => {
    const [currentCursor, setCurrontCursor] = useState<VoteSet['id'] | undefined>(undefined)
    const { data: votesSets, isLoading } = trpc.voteSet.pagination.useQuery({ take: 5 })

    return (
        <MainLayout useContainer={true}>
            <EmptyStateWrapper 
                isLoading={isLoading}
                data={votesSets}
                NonEmptyComponent={<VotesSetsList votesSets={votesSets ?? []} />}
                EmptyComponent={<div>Loading...</div>}
            />
        </MainLayout>
    )
}

export default VotesSetsPaginationScreen
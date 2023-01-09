import MainLayout from "../../../layouts/MainLayout"
import { trpc } from "../../../utils/trpc"
import EmptyStateWrapper from "../../common/EmptyStateWrapper"
import DashboardGrid from "./components/DashboardGrid"
import DashboardHeader from "./components/DashboardHeader"

const DashboardScreen: React.FC = () => {
    const {
        data: voteSets,
        isLoading,
        isError,
        refetch
    } = trpc.voteSet.getAllByUserIdProtected.useQuery()

    return (
        <MainLayout useContainer={true}>
            <EmptyStateWrapper
                isLoading={isLoading}
                isError={isError}
                data={voteSets}
                NonEmptyComponent={(data) =>
                    <>
                        <DashboardHeader voteSetsCount={data.length} />
                        <DashboardGrid voteSets={data} />
                    </>
                }
                ErrorComponent={<span className='text-indicative-danger'>
                    An error has occured!
                    <button
                        onClick={() => refetch()}
                        className='btn ml-3 text-indicative-success hover:border-indicative-error'
                    >
                        Try again
                    </button>
                </span>}
                EmptyComponent={<div>You have no vote sets.</div>}
            />
        </MainLayout>
    )
}

export default DashboardScreen
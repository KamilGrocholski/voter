import { VotesSetsPagination } from '../../../types/trpcOutputTypes'
import VoteSetCard from './Card'

interface Props {
    votesSets: VotesSetsPagination['voteSets']
}

const VotesSetsPagination: React.FC<Props> = ({
    votesSets,
}) => {

    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {votesSets.map((set, i) => (
                <VoteSetCard key={i} {...set} />
            ))}
            {/* <Pagination
                currentPage={currentPage}
                pagesCounter={votesSetsPages.length}
            /> */}
        </div>
    )
}

export default VotesSetsPagination
import React from 'react'
import { VotesSetsPagination } from '../../../types/trpcOutputTypes'
import VoteSetCard from './Card'

interface Props {
    votesSets: VotesSetsPagination
}

const VotesSetsList: React.FC<Props> = ({
    votesSets
}) => {
    return (
        <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {votesSets.map((set, i) => (
                <VoteSetCard key={ i } { ...set } />
            ))}           
        </div>
    )
}

export default VotesSetsList
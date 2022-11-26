export const voteSetSelects = {
    publicMainSelect: {
        id: true,
        image: true,
        name: true,
        updatedAt: true,
        createdAt: true,
        owner: {
            select: {
                id: true,
                name: true,
                image: true,
                role: true
            }
        },
        _count: {
            select: {
                likes: true,
                dislikes: true,
                voteItems: true
            }
        },
        voteItems: {
            select: {
                id: true,
                image: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        votesAgainst: true,
                        votesFor: true
                    }
                }
            }
        }
    },

    publicWithRankedItems: {
        id: true,
        image: true,
        name: true,
        updatedAt: true,
        createdAt: true,
        owner: {
            select: {
                id: true,
                name: true,
                image: true,
                role: true
            }
        },
        _count: {
            select: {
                likes: true,
                dislikes: true,
                voteItems: true
            }
        },
        voteItems: {
            select: {
                id: true,
                image: true,
                name: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        votesAgainst: true,
                        votesFor: true
                    }
                }
            },
            orderedBy: {
                
            }
        }
    }
}

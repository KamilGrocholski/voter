import { useState } from "react"
import { BY, TIME } from "../constants/filter-vote-sets"
import { type TimeMult } from "../server/utils/createDateFromNow"

export interface VoteSetFilterFields {
    name: string
    by: keyof typeof BY
    time: keyof typeof TIME
}

export const useVoteSetsFilter = (defaultFields: Partial<VoteSetFilterFields>) => {
    const [name, setName] = useState<string>(defaultFields.name ?? '')
    const [by, setBy] = useState<keyof typeof BY>(defaultFields.by ?? 'LIKES')
    const [time, setTime] = useState<keyof typeof TIME>(defaultFields.time ?? 'ALL_TIME')
    
    const parse = () => {
        let createdAt: TimeMult | undefined
        switch(time) {
            case 'TODAY':
                createdAt = {day: 1}
                break
            case 'LAST_WEEK':
                createdAt = {week: 1}
                break
            case 'LAST_MONTH': 
                createdAt = {month: 1}
                break
            case 'ALL_TIME': 
                createdAt = undefined
                break
            default:
                createdAt = undefined
                break
        }

        return {
            name,
            orderBy: by,
            createdAt
        }
    }

    return {
        name,
        setName,
        by,
        setBy,
        time,
        setTime,
        parse
    }
}
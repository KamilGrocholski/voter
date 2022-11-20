import { VotePairUndefined } from "./types";

export const isPairValid = (pair: VotePairUndefined): boolean => {
    if (pair?.firstItem && pair?.secondItem) return true
    return false
}
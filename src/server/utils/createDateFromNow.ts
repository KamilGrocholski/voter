export type TimeMult = Partial<Record<Time, number>>    

export enum Time {
    Y = 'year',
    M = 'month',
    W = 'week',
    D = 'day',
    H = 'hour',
    MIN = 'minute',
    SEC = 'second'
}

type TimeTravel = 'future' | 'past'

const TIME_MULTIPLICATION: Record<Time, number> = {
    second: 1000,
    minute: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    week: 7 * 24 * 60 * 60 * 1000,
    month: 30 * 7 * 24 * 60 * 60 * 1000,
    year: 365 * 30 * 7 * 24 * 60 * 60 * 1000
}

export const createDateFromNow = (timeTravel: TimeTravel, timeMult: TimeMult): Date => {
    const nowInMs = Date.now()

    const loopTimeMult = () => {
        const entries = Object.entries(timeMult)
        
        let totalTime = 0

        entries.forEach(([time, n]) => {
            totalTime += TIME_MULTIPLICATION[time as Time] * n
        })

        return totalTime
    }

    const newDate = new Date(timeTravel === 'future' ? nowInMs + loopTimeMult() : nowInMs - loopTimeMult())

    return newDate
}
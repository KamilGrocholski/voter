import getRandomIntInclusive from "./getRandomIntInclusive"

export const getRandomInt: (l: number, u: number, notThisOneInt?: number) => number = (l, u, notThisOneInt): number => {
    const randomInt = getRandomIntInclusive(l, u)
  
    if (randomInt !== notThisOneInt) return randomInt 
    return getRandomInt(l, u, notThisOneInt)
}
  
export const getTwoDifferentRandomInts = (l: number, u: number): [number, number] => {
    const firstInt = getRandomInt(l, u)
    const secondInt = getRandomInt(l, u, firstInt)
  
    return [firstInt, secondInt]
}

export default getTwoDifferentRandomInts
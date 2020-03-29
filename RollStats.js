const R = require('Ramda')

const destributeStats = (characters, sevenKeepSix) => {
    const rolls = rollStats(characters, sevenKeepSix ? 7 : 6)
    const keptRolls = R.map(keepHighest(6), rolls)
    const flatRolls = R.flatten(keptRolls)
    // console.log(flatRolls)
    const sortedRolls = R.sort(R.comparator(R.lt), flatRolls)
    const finalStats = splitStats(sortedRolls, characters)
    console.log(finalStats)
}

const rollStats = (characters, statCount) => {
    return R.map(
        () => makeStats(statCount),
        R.range(0, characters)
    )
}

const splitStats = (stats, charCount) => {
    const statCount = stats.length / charCount
    const range = R.range(1, (statCount - 1) / 2)
    return R.map(char => [
        stats[char],
        ...R.compose(
            R.map(pos => {
                console.log(pos, stats[charCount * pos * 2 - char - 1])
                return [
                    stats[charCount * pos * 2 - char - 1],
                    stats[charCount * pos * 2 + char],
                ]
            })
        )(range),
        stats[stats.length - char - 1],
    ], R.range(0, charCount))
}

const rollDn = (n) => {
    return Math.floor(Math.random() * n) + 1
}

const makeStats = (count, drop) => {
    return R.map(
        () => makeStat(),
        R.range(0, count)
    )
}

const makeStat = () => {
    const rolls = R.map(
        () => rollDn(6),
        R.range(0, 4)
    )
    return R.compose(
        R.sum,
        keepHighest(3)
    )(rolls)
}

const keepHighest = (count) =>
    R.compose(
        R.slice(0, count),
        R.sort(R.comparator(R.gt))
    )

const keepLowest = (count) =>
    R.compose(
        R.slice(0, count),
        R.sort(R.comparator(R.lt))
    )

destributeStats(5, true)
// console.log(rollStats(6, 6))
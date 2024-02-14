const
    someArray1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    result1 = {}

someArray1.reduce((acc, val, i) => {
    const index = String.fromCharCode(97 + i)
    acc[index] = val

    return acc
}, result1)

console.log({ result1 })

// #2.2.
someObject1 = { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 10, k: NaN, l: 0, m: 0.25, n: null, o: {}, p: [], r: Infinity, s: undefined }

// конечные действительные
const reals = (e) => typeof e === 'number' && isFinite(e)
const res1 = Object.values(someObject1).filter(reals)

// натуральные
const integers = (e) => Number.isInteger(e)
const res2 = Object.values(someObject1).filter(integers)

// POJO
const pogos = (e) => e?.constructor === Object
const res3 = Object.values(someObject1).filter(pogos)

console.log({ res1, res2, res3 })





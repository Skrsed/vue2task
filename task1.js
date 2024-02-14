const alphabetSlice = (from = 0, to = 25, exclude = ['c', 'd']) => {
    if (typeof from !== 'number' || typeof to !== 'number' || !Array.isArray(exclude)) {
        throw new Error('Неверный тип аргументов')
    }

    if (from < 0 || from > 65535 || to < 0 || to > 65535) {
        throw new Error('Неверные значения from и to')
    }

    if (exclude.find(e => e.length > 1)) {
        throw new Error('Неверное значение exclude')
    }

    const content = []
    for (let i = from; i <= to; i++) {
        const char = String.fromCharCode(97 + i)
        if (!exclude.includes(char)) {
            content.push(char)
        }
    }
    return content.join(' ')
}

const res = alphabetSlice(0, 25, exclude = ['t', 'e', 's', 't'])
console.log({ res })
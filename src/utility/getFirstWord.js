
export const getFirstWord = words => {
    let ret = words.indexOf(' ') === -1 ? words.substr(0) : words.substr(0, words.indexOf(' '))
    // remove punctuation
    ret = ret.match(/[^?!.,;:]+/g).join('')
    return ret
}
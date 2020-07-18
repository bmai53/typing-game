export const calculateScore = (words, typos) => {
    return 100*words - 10*typos
}
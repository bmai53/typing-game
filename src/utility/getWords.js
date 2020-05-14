const txtgen = require('txtgen');

export const getWords = (count = 10) => {

    const ret = txtgen.sentence()
    return ret
}
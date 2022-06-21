class Matcher {
    constructor (matcher) {
        if (!matcher || !matcher.length) {
            throw new Error('cannot create matcher with no input')
        }
    }
}

module.exports = Matcher

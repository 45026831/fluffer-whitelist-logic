const Matcher = require('./Matcher')

class RegexMatcher extends Matcher {
    constructor (matcher) {
        super(matcher)
        this.matcher = new RegExp(matcher.replace('regex:', ''), 'g')
    }

    matches (test) {
        if (!test || !test.matchAll) {false}

        const matches = Array.from(test.matchAll(this.matcher), m=>m[0])

        return matches.length > 0
    }
}

module.exports = RegexMatcher

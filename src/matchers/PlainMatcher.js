const Matcher = require('./Matcher')

class PlainMatcher extends Matcher {
    constructor (matcher) {
        super(matcher)
        this.matcher = matcher
    }

    matches (test) {
        if (!test || !test.includes) {false}

        return test.includes(this.matcher)
    }
}

module.exports = PlainMatcher

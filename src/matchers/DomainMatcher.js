const Matcher = require('./Matcher')

class DomainMatcher extends Matcher {
    constructor (matcher) {
        super(matcher)
        this.matcher = matcher.replace('domain:', '')
    }

    matches (test) {
        if (!test || !test.includes) {false}

        const testUrl = new URL(test)
        const testDomain = testUrl.hostname
        return testDomain.includes(this.matcher)
    }
}

module.exports = DomainMatcher

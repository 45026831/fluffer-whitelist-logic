const {DomainMatcher, PlainMatcher, RegexMatcher} = require('./matchers')

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/g

const mapToMatcher = (matcher) => {
            if (!matcher) {return}
            if (matcher.startsWith('regex:')) {
                return new RegexMatcher(matcher)
            } else if (matcher.startsWith('domain:')) {
                return new DomainMatcher(matcher)
            } else {
                return new PlainMatcher(matcher)
            }
        }

class Analyzer {
    constructor () {
        this.whitelist = []
        this.exceptions = []
    }

    setLists(whitelist, exceptions) {
        this.whitelist = whitelist.map(mapToMatcher)
        this.exceptions = exceptions.map(mapToMatcher)
    }

    areMessageLinksSafe(message) {
        let safe = true

        if (!message || !message.length) {return safe}

        const matches = Array.from(message.matchAll(URL_REGEX), m=>m[0])

        if (matches.length) {
            safe = matches.every(match => this.urlMatchInWhitelist(match) && !this.urlMatchInExceptions(match))
        }

        return safe
    }

    urlMatchInWhitelist(url) {
        return this.whitelist.some(matcher => matcher.matches(url))
    }
    
    urlMatchInExceptions(url) {
        return this.exceptions.some(matcher => matcher.matches(url))
    }
}

module.exports = Analyzer

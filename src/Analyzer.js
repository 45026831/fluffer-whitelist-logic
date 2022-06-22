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

    setWhitelist(whitelist) {
        if (!Array.isArray(whitelist)) {throw new Error('cannot set whitelist of invalid type')}
        this.whitelist = whitelist.map(mapToMatcher)
    }
    
    setExecptions(exceptions) {
        if (!Array.isArray(exceptions)) {throw new Error('cannot set exceptions of invalid type')}
        this.exceptions = exceptions.map(mapToMatcher)
    }

    areMessageLinksSafe(message) {
        if (!message || !message.length) {return true}

        const matches = Array.from(message.matchAll(URL_REGEX), m=>m[0])
        return matches.every(match => this.urlMatchInWhitelist(match) && !this.urlMatchInExceptions(match))
    }

    urlMatchInWhitelist(url) {
        return this.whitelist.some(matcher => matcher.matches(url))
    }
    
    urlMatchInExceptions(url) {
        return this.exceptions.some(matcher => matcher.matches(url))
    }
}

module.exports = Analyzer

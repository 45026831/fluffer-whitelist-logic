const Analyzer = require('./Analyzer')

const testWhitelist = [
    'domain:google.com',
    'domain:tenor.com',
    'regex:^https://discord.com'
]

const testExceptions = [
    'google.com/url',
    'regex:tenor\.com/.*-tohsaka-.*',
]

describe ('Analyzer', () => {
    let testAnalyzer

    beforeAll(() => {
        testAnalyzer = new Analyzer()

        testAnalyzer.setLists(testWhitelist, testExceptions)
    })

    it('should return safe for a message with no links', () => {
        expect(testAnalyzer.areMessageLinksSafe('this is an example message with no links')).toBe(true)
    })
    it('should return safe for a message with a whitelisted link', () => {
        expect(testAnalyzer.areMessageLinksSafe('this is an example message with a link to a google sheets spreadsheet https://docs.google.com/spreadsheets/d/1kVZxcZZMa82lS4k-IpxTTTELAeaipjR_v1twlqW5vbI/edit#gid=508554761 included')).toBe(true)
    })
    it('should return unsafe for a message with a link that is unlisted', () => {
        expect(testAnalyzer.areMessageLinksSafe('this is an example message with a link to https://example.com included')).toBe(false)
    })
    it('should return unsafe for a message with a link that is of a whitelisted domain but matches an exception', () => {
        expect(testAnalyzer.areMessageLinksSafe('this is an example message with a link to a google redirect https://google.com/url?r=https://example.com included')).toBe(false)
    })
    it('should return unsafe for a message with 2 links, one whitelisted and one unlisted', () => {
        expect(testAnalyzer.areMessageLinksSafe('this is an example message with a link to https://google.com and https://example.com included')).toBe(false)
    })
    it('should return unsafe for a multi-line message with a link that is unlisted', () => {
        expect(testAnalyzer.areMessageLinksSafe(`this is an example
        mutli-line message with a link to
        https://example.com included`)).toBe(false)
    })
})
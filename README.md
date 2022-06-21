Explanation

The analyzer extracts all URLs from a message, then checks each one against the whitelist and exceptions.

It is assumed that the lists are of plain strings that fall into 3 types of matcher:

- Plain Matcher: Simple includes matcher, has to appear somewhere in the URL
- Domain Matcher: Matches links on this domain and all subdomains. List string prefixed with `domain:`
- Regex Matcher: Matches on a regex pattern. List string prefixed with `regex:`

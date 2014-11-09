SignatureFinder
===============

Web app created for use in Umd's research in software vulnerabilities. Code signatures are pieces of code that were reported to be a part of a bug, and were removed from the library at some release. The tool makes it easy to find exactly which releases were vulnerable because of the bug.

The app allows a user to enter up to 5 code signatures that will be searched for in every major Moodle and PHPMyAdmin release. Each signature queried will have an exact set of releases in which the code signature was found. There is also and a summative range of releases that is a union of the individual sets of releases found for the 5 queries.

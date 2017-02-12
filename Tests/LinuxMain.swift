import XCTest
@testable import ApplicationTests
@testable import DatabaseTests

XCTMain([
    testCase(ServerTest.allTests),
    testCase(DatabaseTest.allTests)
])

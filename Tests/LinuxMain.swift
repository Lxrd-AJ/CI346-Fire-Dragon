import XCTest
@testable import CoreTests
@testable import DatabaseTests

XCTMain([
    testCase(ServerTest.allTests),
    testCase(DatabaseTest.allTests)
])

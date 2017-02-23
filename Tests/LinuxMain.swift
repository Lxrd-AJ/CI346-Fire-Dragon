import XCTest
@testable import CoreTests
@testable import ModelTests

XCTMain([
    testCase(ServerTest.allTests),
    testCase(ModelTests.allTests)
])

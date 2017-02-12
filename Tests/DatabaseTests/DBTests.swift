import XCTest
@testable import Database

class DatabaseTest : XCTestCase {
    func testExampleTest(){
        let db = DB()
        XCTAssertEqual( db.num, 100, "Correct DB number used" )
    }
}

extension DatabaseTest {
    static var allTests: [(String,(DatabaseTest) -> () throws -> Void)] {
        return [
            ("testExampleTest",testExampleTest)
        ]
    }
}

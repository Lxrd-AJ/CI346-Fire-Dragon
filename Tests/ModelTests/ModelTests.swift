import XCTest
@testable import Models

class ModelTest : XCTestCase {
    func testExampleTest(){
        let db = DB()
        XCTAssertEqual( db.num, 100, "Correct DB number used" )
    }
}

extension ModelTest {
    static var allTests: [(String,(ModelTest) -> () throws -> Void)] {
        return [
            ("testExampleTest",testExampleTest)
        ]
    }
}

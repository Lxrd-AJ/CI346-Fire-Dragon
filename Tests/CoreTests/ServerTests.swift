import XCTest
@testable import Core 

class ServerTest: XCTestCase {
    func testExampleTest(){
        let server = Server()
        XCTAssertEqual( server.port, 8080, "Correct port number used" )
    }
}

extension ServerTest {
    static var allTests: [(String,(ServerTest) -> () throws -> Void)] {
        return [
            ("testExampleTest",testExampleTest)
        ]
    }
}

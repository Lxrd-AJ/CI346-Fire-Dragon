import XCTest
@testable import Core

class ServerTest: XCTestCase {
    func testExampleTest(){
        let environment:Environment = Environment();
        let server = Server(environment: environment)
        XCTAssertEqual( server.port, 8090, "Correct port number used" )
    }
}

extension ServerTest {
    static var allTests: [(String,(ServerTest) -> () throws -> Void)] {
        return [
            ("testExampleTest",testExampleTest)
        ]
    }
}

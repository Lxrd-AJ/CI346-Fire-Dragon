import Kitura
import HeliumLogger
import Core
import Models
import Foundation
import LoggerAPI


//setbuf(stdout, nil)
Log.logger = HeliumLogger()

var environment:Environment = Environment();

if let envArgument = CommandLine.arguments.filter({ $0.hasPrefix("env") }).first{
    let envString = envArgument.components(separatedBy: "=")[1]
    environment = Environment(string:envString)
}

let server: Server = Server(environment: environment)

Kitura.addHTTPServer(onPort: server.port, with: server.router)
Kitura.run()

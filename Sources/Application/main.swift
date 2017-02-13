import Kitura
import HeliumLogger
import Core
import Database

HeliumLogger.use()

for argument in CommandLine.arguments {
    print("Argument => \(argument)")
}

let server: Server = Server() //staticDir:"./Clients/Web/Dist/"

Kitura.addHTTPServer(onPort: server.port, with: server.router)
Kitura.run()

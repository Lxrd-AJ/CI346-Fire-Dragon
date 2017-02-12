import Kitura
import HeliumLogger

public class Server{

    public let router:Router
    public let port:Int = 8090
    let staticServer = StaticFileServer(path: "./Clients/Web/Dist/")

    public init() { //staticDir:String:"./Clients/Web/Dist/"
        router = Router()
        router.get("/", handler: tempHandler)
    }

    func tempHandler(request:RouterRequest, response:RouterResponse, next:() -> Void){
        response.send("Hello Cruel World")
        next()
    }

//    func getWebClient(request:RouterRequest, response:RouterResponse, next:() -> Void) throws {
//        try response.send(fileName:"index.html")
//        response.send("Hello World!")
//        defer {
//            next()
//        }
//    }
}

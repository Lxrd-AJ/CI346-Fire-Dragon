import Kitura

public class Server{

    public let router:Router
    public let port:Int = 8090
    let staticServer = StaticFileServer(path: "./Clients/Fire/dist/") //TODO: Change Static Dir based on the env

    public init() { //staticDir:String:"./Clients/Web/Dist/"
        router = Router()
        router.all("/", middleware: staticServer);
        //router.get("/", middleware: staticServer, handler: tempHandler)
    }

    func tempHandler(request:RouterRequest, response:RouterResponse, next:() -> Void){
        do{
            try response.send(fileName: "index.html")
        }catch{
            print(error);
            print("Failed to send index.html")
            response.send("Failed to server web app")
        }
        defer { next(); }
    }

//    func getWebClient(request:RouterRequest, response:RouterResponse, next:() -> Void) throws {
//        try response.send(fileName:"index.html")
//        response.send("Hello World!")
//        defer {
//            next()
//        }
//    }
}

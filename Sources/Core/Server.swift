import Kitura
import Fluent
import FluentMongo
import MongoKitten
import Models

/**
- TODO
    * Use the static directory specified by the environment
    * Use the DB details specified by Env
*/
public class Server{

    public let router:Router
    public let port:Int = 8090
    let staticServer = StaticFileServer(path: "./Clients/Fire/dist/")

    public init() {
        router = Router()
        router.all("/", middleware: staticServer);
        //router.get("/", middleware: staticServer, handler: tempHandler)

        do{
            let mongo = try MongoDriver(database: "test", user: "", password: "", host: "localhost", port:27017 )
            Database.default = Database(mongo)

            //Test
            var employee = Employee(name:"John Appleseed", age: 50);
            try employee.save()
            print(employee.id as Any);
        }catch {
            print(error)
        }
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

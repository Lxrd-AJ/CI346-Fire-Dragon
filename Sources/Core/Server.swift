import Kitura
import Fluent
import FluentMongo
import MongoKitten
import Models
import SwiftyJSON
import LoggerAPI


public class Server{

    public let router:Router
    public let port:Int = 8090
    let staticServer: StaticFileServer
    var environment: Environment
    lazy var mongoDriver: MongoDriver? = {
        do{
            let driver = try MongoDriver(database: self.environment.database["Database"]!,
                    user: self.environment.database["User"]!,
                    password: self.environment.database["Password"]!,
                    host: self.environment.database["Host"]!,
                    port: Int(self.environment.database["Port"]!)! )
            return driver
        }catch {
            Log.error("Failed to connect to MongoDB database" )
            print(error)
        }
        return nil;
    }()


    public init(environment env: Environment) {
        self.environment = env
        staticServer = StaticFileServer(path: self.environment.publicDirectory)
        router = Router()
        Database.default = Database(self.mongoDriver!)

        router.all("/", middleware: staticServer);
        router.all("/", middleware: BodyParser())
        router.route("employee")
            .get(handler: getEmployeeHandler)
            .post(handler: postEmployeeHandler)

    }

    //TODO: All Employee Related route handlers should be moved to an EmployeeHandler class eventually
    func postEmployeeHandler(request:RouterRequest, response:RouterResponse, next:() -> Void){
        guard let parsedBody = request.body else {
            response.status(.badRequest).send("")
            return
        }
        switch (parsedBody){
            case .json(let jsonBody):
                guard let employeeJSON = jsonBody["employee"] as JSON? else {
                    response.status(.badRequest).send("Bad request")
                    return;
                }
                print(employeeJSON.object)
                print(type(of: employeeJSON))

                if( employeeJSON["id"].exists() && !employeeJSON["id"].string!.isEmpty){
                    print("Exsting object")
                }else{
                    do{
                        var employee = Employee.from(JSON: employeeJSON)
                        try employee.save()
                        Log.info("Created new Employee object \(employee.id)")
                        response.status(.OK).send(json: employee.toJSON() )
                    }catch {
                        Log.error("An Error occurred saving the Employee Object")
                        print(error)
                        response.status(.badRequest).send("Error Saving object")
                    }
                }
                break;
            default: break
        }
        defer{ next() }
    }

    func getEmployeeHandler(request:RouterRequest, response:RouterResponse, next:() -> Void){
        do{
            let users: [Employee] = try Employee.query().all()
            Log.info("Sending \(users.count) employees")
            response.status(.OK).send(json: JSON(users.map({ $0.toJSON() })) )
        }catch{
            print(error)
        }
        defer { next() }
    }


}

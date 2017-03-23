import Kitura
import Fluent
import FluentMongo
import MongoKitten
import Models
import SwiftyJSON
import LoggerAPI


public class ShiftHandler {

    public static func getShiftHandler(request:RouterRequest, response:RouterResponse, next:() -> Void){
        do{
            let shifts: [Shift] = try Shift.query().all()
            Log.info("Sending \(shifts.count) shift data")
            response.status(.OK).send(json: JSON(shifts.map({ $0.toJSON() })) )
        }catch{
            print(error)
        }
        defer { next() }
    }

    public static func postShiftHandler(request:RouterRequest, response:RouterResponse, next:() -> Void){
        guard let parsedBody = request.body else {
            response.status(.badRequest).send("")
            return
        }

        switch (parsedBody){
            case .json(let jsonBody):
                guard let shiftJSON = jsonBody["shift"] as JSON? else {
                    response.status(.badRequest).send("Bad request")
                    return;
                }
                print(shiftJSON.object)
                print(type(of: shiftJSON))

                if( shiftJSON["id"].exists() && !shiftJSON["id"].string!.isEmpty){
                    print("Exsting object")
                    //TODO:updateShift(shiftJSON)
                }else{
                    do{
                        var shift = Shift.from(JSON: shiftJSON)
                        try shift.save()

                        if let employeeJSONs = shiftJSON["employees"].arrayValue {
                            print(employeeJSONs)
                            
                            //TODO: Continue here
                        }
                        Log.info("Created new Shift object \(shift.id)")
                        response.status(.OK).send(json: shift.toJSON() )
                    }catch {
                        Log.error("An Error occurred saving the Shift Object")
                        print(error)
                        response.status(.badRequest).send("Error Saving object")
                    }
                }
                break;
            default: break
        }
        defer{ next() }
    }


    func updateShift( json:JSON ){
        do{
            let shift = try Shift.find( json["id"].string! )
            print(shift)
        }catch{
            Log.error("An Error occurred whilst update the shift \(json)")
        }
    }
}

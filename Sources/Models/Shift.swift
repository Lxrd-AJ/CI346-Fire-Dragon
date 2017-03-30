//
// Created by mr_robot on 07/03/17.
//

import Foundation
import Fluent
import SwiftyJSON
import LoggerAPI
import Node

public class Shift: Entity {
    public var id: Node?
    public var name: String
    public var startDate: Date
    public var endDate: Date
    let dateFormatter: DateFormatter = {
        let df = DateFormatter();
        df.dateFormat = "yyyy-MM-dd"
        return df
    }()
    enum Error: Swift.Error {
        case dateNotSupported
    }

    public class var table: String{ return "shift" }

    public init(name: String, startDate:Date, endDate:Date ){
        self.name = name;
        self.startDate = startDate;
        self.endDate = endDate;
    }

    public required init(node:Node, in context:Context) throws {
        id = try node.extract("id")
        name = try node.extract("name")

//        let rawStartDate = try node.extract("startDate") as String
        let rawStartDate = node["startDate"]!.string!
        guard let sDate = dateFormatter.date(from: rawStartDate) else { throw Error.dateNotSupported }
        startDate = sDate

        let rawEndDate = node["endDate"]!.string!
        guard let eDate = dateFormatter.date(from: rawEndDate) else { throw Error.dateNotSupported }
        endDate = eDate

    }

    public required init(serialized: [String:Node]){
        id = serialized["id"]
        name = serialized["name"]?.string ?? ""

        if let rawStartDate = serialized["startDate"]!.string {
            startDate = dateFormatter.date(from: rawStartDate)!
        }else{
            startDate = Date()
        }
        if let rawEndDate = serialized["endDate"]!.string {
            endDate = dateFormatter.date(from: rawEndDate)!
        }else{
            endDate = Date()
        }
    }

    public func serialize() -> [String:Node?]{
        return [
            "name": Node(self.name),
                "startDate": Node(dateFormatter.string(from: self.startDate)),
                "endDate": Node(dateFormatter.string(from: self.endDate))

        ]
    }

    public func makeNode(context: Context) throws -> Node {
        return try Node(node: [
            "id": id,
                "name": name,
                "startDate": Node(dateFormatter.string(from: self.startDate)),
                "endDate": Node(dateFormatter.string(from: self.endDate))
        ])
    }

    public static func prepare(_ database: Fluent.Database) throws {}
    public static func revert(_ database: Fluent.Database) throws {}
}

extension Shift {
    public static func from(JSON json:JSON) -> Shift {
        return Shift(
                name: json["name"].string ?? "",
                startDate: json["startDate"].date ?? Date(),
                endDate: json["endDate"].date ?? Date()
        )
    }
}

//Extension for many to many relationship with employees
extension Shift {
    func employees() throws -> Siblings<Employee>{
        return try siblings()
    }
}

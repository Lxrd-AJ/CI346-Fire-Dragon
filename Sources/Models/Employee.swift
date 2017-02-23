//
// Created by mr_robot on 23/02/17.
//

import Foundation
import Fluent

public class Employee: Entity {
    public var id: Node?
    var name: String
    var age: Int

    public class var table: String{ return "employee" }

    public init(name:String, age:Int){
        self.name = name;
        self.age = age
    }

    public required init(serialized: [String:Node]){
        id = serialized["id"]
        name = serialized["name"]?.string ?? ""
        age = serialized["age"]?.int ?? 0
    }

    public required init(node:Node, in context:Context) throws {
        id = try node.extract("id")
        name = try node.extract("name")
        age = try node.extract("age")
    }

    public func serialize() -> [String:Node?] {
        return [
            "name": Node(self.name),
            "age": Node(self.age)
        ]
    }

    public func makeNode(context: Context) throws -> Node {
        return try Node(node: [
                "id": id,
                "name": name,
                "age": age
        ])
    }

    public static func prepare(_ database: Fluent.Database) throws {}
    public static func revert(_ database: Fluent.Database) throws {}
}

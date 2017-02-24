//
// Created by mr_robot on 23/02/17.
//

import Foundation
import Fluent
import SwiftyJSON
import LoggerAPI
import Node

public class Employee: Entity {
    public var id: Node?
    var name: String
    var age: Int
    public var exists: Bool = false

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

//TODO: Follow this tutorial instead http://codelle.com/blog/2016/5/an-easy-way-to-convert-swift-structs-to-json/

extension Employee {
    public func toJSON() -> JSON {
        let mirror = Mirror(reflecting: self)
//        let x = mirror.children.enumerated().reduce(JSON([])){ prevJSON, attribute in
//            let attrJSON: JSON = [ (attribute.element.label as String!) : attribute.element.value ]
//            return prevJSON.merged(with: attrJSON)
//        } //prevJSON:JSON, attribute:Mirror.Child
//        print(x)
        var json = JSON([:])
        for (_,attribute) in mirror.children.enumerated() {
            var _json: JSON;
            if attribute.label as String! == "id" {
                let value = (attribute.value as! Node).string! as String
                _json = [ (attribute.label as String!) : value  ]
            }else{
                _json = [ (attribute.label as String!) : attribute.value  ]
            }
            json.merge(other: _json)
        }
        return json;
    }
}

extension JSON {
    mutating func merge(other: JSON) {
        if self.type == other.type {
            switch self.type {
            case .dictionary:
                for (key, _) in other {
                    self[key].merge(other: other[key])
                }
            case .array:
                self = JSON(self.arrayValue + other.arrayValue)
            default:
                self = other
            }
        } else {
            self = other
        }
    }

    func merged(with: JSON) -> JSON {
        var merged = self
        merged.merge(other: with)
        return merged
    }
}
//
// Created by mr_robot on 07/03/17.
//

import Foundation
import Fluent
import SwiftyJSON
import LoggerAPI

public extension Entity {
    public func toJSON() -> JSON {
        let mirror = Mirror(reflecting: self)
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

public extension JSON {
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

    public var date: Date? {
        get {
            if let str = self.string {
                Log.info("JSON string -> \(str)")
                return JSON.jsonDateFormatter.date(from: str)
            }
            return nil
        }
    }

    private static let jsonDateFormatter: DateFormatter = {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd"
        //dateFormatter.timeZone = TimeZone.autoupdatingCurrent
        return dateFormatter
    }()

}
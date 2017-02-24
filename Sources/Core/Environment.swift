//
// Created by mr_robot on 24/02/17.
//

import Foundation

public enum Env {
    case production
    case development

    static func toEnum(string val:String) -> Env {
        switch val {
            case "prod":
                return .production
            case "dev":
                return .development
            default:
                return .development
        }
    }
}

public struct Environment {
    public var env:Env = Env.development
    lazy public var database: [String:String] = {
        switch self.env {
            case .production:
                return [
                    "Database":"FireDragon",
                        "User":"hohenheim",
                        "Password": "valhala",
                        "Host":"localhost",
                        "Port":"27017"
                ]
            case .development:
                return [
                        "Database":"FireDragon",
                        "User":"",
                        "Password": "",
                        "Host":"localhost",
                        "Port":"27017"
                ]
        }

    }()
    lazy public var publicDirectory: String = {
        switch self.env {
            case .production: return "./Clients/Fire/dist/"
            case .development: return "./Clients/Fire/dist/"
        }
    }()

    public init(string:String? = "dev"){
        self.env = Env.toEnum(string:string!)
    }
}
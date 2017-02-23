import PackageDescription

let package = Package(
    name: "CI346-Fire-Dragon",
    targets: [
        Target(name:"Application", dependencies: ["Core"]),
        Target(name:"Core", dependencies: ["Models"]),
        Target(name:"Models")
    ],
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 4),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 1, minor: 4),
        .Package(url: "https://github.com/vapor/fluent.git", majorVersion: 1, minor: 4),
        .Package(url: "https://github.com/vapor/mongo-driver.git", majorVersion: 1, minor: 0)
    ]
)

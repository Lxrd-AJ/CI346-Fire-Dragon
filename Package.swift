import PackageDescription

let package = Package(
    name: "CI346-Fire-Dragon",
    targets: [
        Target(name:"Application", dependencies: ["Core","Database"]),
        Target(name:"Core"),
        Target(name:"Database")
    ],
    dependencies: [
        .Package(url: "https://github.com/IBM-Swift/Kitura.git", majorVersion: 1, minor: 4),
        .Package(url: "https://github.com/IBM-Swift/HeliumLogger.git", majorVersion: 1, minor: 4)
    ]
)

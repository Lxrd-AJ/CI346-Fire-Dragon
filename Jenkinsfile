node {
    stage "Testing"
        checkout scm
        docker.image('ibmcom/swift-ubuntu:latest').inside {
            stage "Test server app"
                sh "swift test"
        }

    stage "Container build"
        checkout scm
        def environment = docker.build "ci346-fire-dragon"
        // environment.inside {
        //     stage "Docker -> Test"
        //         sh "swift test"
        // }
}


// pipeline {
//     agent any
//
//     environment {
//         swift = "/home/mr_robot/.swiftenv/shims/swift"
//     }
//
//     stages {
//         stage("Pre-Test"){
//             steps{
//                 sh "node -v"
//                 sh "whoami"
//             }
//         }
//
//         stage("-> Ubuntu Swift Container: Testing"){
//             def environment = docker.build "test-container"
//             environment.inside {
//                 stage("Docker -> Test"){
//                     sh "swift test"
//                 }
//             }
//             //docker.image('ibmcom/swift-ubuntu:latest').inside {}
//         }
//
//         // stage("Test"){
//         //     steps{
//         //         //sh "chmod +x test_server.sh"
//         //         //sh "sudo ./test_server.sh"
//         //         withEnv(['PATH+SWIFT=/home/mr_robot/.swiftenv/shims']){
//         //             sh "swift test"
//         //         }
//         //         //sh "bash ./test_server.sh"
//         //     }
//         // }
//
//         // stage("Build"){
//         //     steps {
//         //         sh "swift build --configuration release"
//         //         archive "./.build/release/Application"
//         //     }
//         // }
//         //
//         // stage("Run"){
//         //     steps{
//         //         sh "./.build/release/Application env=prod"
//         //     }
//         // }
//     }
// }

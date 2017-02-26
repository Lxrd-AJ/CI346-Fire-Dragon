node {
    stage "Testing"
        docker.image('ibmcom/swift-ubuntu:latest').inside() { //withRun
            checkout scm
            stage "Test server app"
                //sh "whoami"
                sh "swift test"
        }

    stage "Container build"
        checkout scm
        def container = docker.build "ci346-fire-dragon:latest"
        try{
            container.run('--name ci346-fire-dragon -d -p 8090:80 -p 27017:27017')
        }catch(error){
            stage "Cleanup"
                sh "docker rm -f ${"\$(docker ps -a -q --filter name=ci346-fire-dragon)"}"
        }finally{
            container.run('--name ci346-fire-dragon -d -p 8090:80')
        }

}

//TODO: Database setup


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

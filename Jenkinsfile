pipeline {
    agent any

    stages {

        stage("Test"){
            steps{
                //sh "/home/mr_robot/.swiftenv/shims/swift test"
                sh "chmod +x test_server.sh"
                sh "./test_server.sh"
            }
        }

        stage("Build"){
            steps {
                sh "/home/mr_robot/.swiftenv/shims/swift build --configuration release"
            }
        }

        stage("Run"){
            steps{
                sh "./.build/release/Application env=prod"
            }
        }
    }
}
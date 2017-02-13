pipeline {
    agent any

    environment {
        swift = "/home/mr_robot/.swiftenv/shims/swift"
    }

    stages {
        stage("Pre-Test"){
            steps{
                sh "node -v"
                sh "whoami"
                env.USER = "mr_robot"
                sh "whoami"
                sh "which swift"
            }
        }

        stage("Test"){
            steps{
                //sh "chmod +x test_server.sh"
                //sh "sudo ./test_server.sh"
                env.USER = "mr_robot"
                sh "swift test"
            }
        }

        stage("Build"){
            steps {
                sh "swift build --configuration release"
                archive "./.build/release/Application"
            }
        }

        stage("Run"){
            steps{
                sh "./.build/release/Application env=prod"
            }
        }
    }
}
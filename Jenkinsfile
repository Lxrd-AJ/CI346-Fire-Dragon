pipeline {
    agent any

    environment {
        swift = "/home/mr_robot/.swiftenv/shims/swift"
    }

    stages {

        stage("Test"){
            steps{
                //sh "chmod +x test_server.sh"
                //sh "sudo ./test_server.sh"
                sh "${swift} test"
            }
        }

        stage("Build"){
            steps {
                sh "${swift} build --configuration release"
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
pipeline {
    agent any

    stages {

        stage("Test"){
            steps{
                sh "/home/mr_robot/.swiftenv/shims/swift test"
            }
        }

        stage("Build"){
            steps {
                sh "/home/mr_robot/.swiftenv/shims/swift build --configuration release"
            }
        }

        stage("Test-Start_Server"){
            steps{
                sh "./.build/release/Application env=prod"
            }
        }
    }
}
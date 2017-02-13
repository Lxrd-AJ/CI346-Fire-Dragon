pipeline {
    agent any

    stages {

        stage("Test - Server"){
            steps{
                sh "swift test"
            }
        }

        stage("Build - Server"){
            steps {
                sh "swift build --configuration release"
            }
        }

        stage("Test-Start_Server"){
            steps{
                sh "./.build/release/Application env=prod"
            }
        }
    }
}
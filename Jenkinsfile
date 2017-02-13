pipeline {
    agent any

    def swift = "/home/mr_robot/.swiftenv/shims/swift"

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
                archiveArtifacts artifacts: "./.build/release/Application"
            }
        }

        stage("Run"){
            steps{
                sh "./.build/release/Application env=prod"
            }
        }

        stage("Deploy"){
            when { currentBuild.result == 'SUCCESS' }
            steps{
                //Do nothing for now
                sh "echo 'Complete'"
            }
        }
    }
}
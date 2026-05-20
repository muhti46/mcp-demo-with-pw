pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-v /tmp:/tmp'
        }
    }

    environment {
        ALLURE_RESULTS_DIR = "${WORKSPACE}/allure-results"
        ALLURE_REPORT_DIR = "${WORKSPACE}/allure-report"
        JAVA_HOME = "/usr/lib/jvm/java-17-openjdk-amd64"
    }

    stages {
        stage('Run Cucumber Tests') {
            steps {
                sh 'npm run test:cucumber'
            }
        }

        stage('Generate Allure Report') {
            steps {
                sh 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}
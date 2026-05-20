pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    environment {
        ALLURE_RESULTS_DIR = "${WORKSPACE}/allure-results"
        ALLURE_REPORT_DIR = "${WORKSPACE}/allure-report"
        JAVA_HOME = "/usr/lib/jvm/java-17-openjdk-amd64"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

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
            script {
                try {
                    if (fileExists('allure-results')) {
                        allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                    } else {
                        echo 'allure-results bulunamadi, Allure adimi atlandi.'
                    }
                } catch (Exception e) {
                    echo "Post actions atlandi: ${e.getMessage()}"
                }
            }
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}
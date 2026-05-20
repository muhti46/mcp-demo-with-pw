pipeline {
    agent {
        dockerfile {
            filename 'Dockerfile'
            args '-v /tmp:/tmp'
        }
    }

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
                sh 'git config --global --add safe.directory "$WORKSPACE" || true'
                checkout scm
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
                if (fileExists('allure-results')) {
                    allure includeProperties: false, jdk: '', results: [[path: 'allure-results']]
                } else {
                    echo 'allure-results bulunamadi, Allure adimi atlandi.'
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
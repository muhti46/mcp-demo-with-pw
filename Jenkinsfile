pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        ALLURE_RESULTS_DIR = "${WORKSPACE}/allure-results"
        ALLURE_REPORT_DIR = "${WORKSPACE}/allure-report"
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

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install chromium --with-deps'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh 'npm run test:cucumber'
            }
            post {
                always {
                    junit allowEmptyResults: true,
                        testResults: 'allure-results/**/*.xml'
                }
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
            allure includeProperties: false,
                results: [[path: 'allure-results']],
                report: 'allure-report'
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}

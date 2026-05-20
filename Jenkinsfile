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

        stage('Install Playwright Browser') {
            steps {
                sh 'node ./node_modules/@playwright/test/cli.js install chromium'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh 'node ./node_modules/@cucumber/cucumber/bin/cucumber.js'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-results/**,cucumber-report.html,playwright-report/**', allowEmptyArchive: true
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}
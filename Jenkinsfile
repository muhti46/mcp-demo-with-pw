pipeline {
    agent any

    parameters {
        booleanParam(name: 'HEADED', defaultValue: false, description: 'Tarayiciyi headed modda calistir (Linux icin xvfb gerekir).')
    }

    options {
        skipDefaultCheckout(true)
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

        stage('Install Playwright Browser') {
            steps {
                sh 'node ./node_modules/@playwright/test/cli.js install chromium'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                script {
                    if (params.HEADED) {
                        sh '''
                            if command -v xvfb-run >/dev/null 2>&1; then
                                HEADED=true xvfb-run -a node ./node_modules/@cucumber/cucumber/bin/cucumber.js
                            else
                                echo "HEADED=true secildi ama xvfb-run bulunamadi. Kurulum icin: apt-get update && apt-get install -y xvfb"
                                exit 1
                            fi
                        '''
                    } else {
                        sh 'node ./node_modules/@cucumber/cucumber/bin/cucumber.js'
                    }
                }
            }
        }

    }

    post {
        always {
            archiveArtifacts artifacts: 'allure-results/**,allure-report/**,cucumber-report.html,playwright-report/**', allowEmptyArchive: true
            allure includeProperties: false, jdk: '', toolName: 'allure-default', results: [[path: 'allure-results']]
        }
        success {
            echo 'All tests passed!'
        }
        failure {
            echo 'Some tests failed!'
        }
    }
}
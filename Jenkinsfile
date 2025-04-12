pipeline {
    agent any

    stages {
        stage('Build Docker Images') {
            steps {
                echo '📦 Building Docker Images...'
                sh 'docker-compose build'
            }
        }

        stage('Test') {
            steps {
                echo '✅ No test stage defined — skipping...'
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deploying services using docker-compose...'
                sh 'docker-compose up -d'
            }
        }

        stage('Cleanup') {
            steps {
                echo '🧹 Cleaning up unused Docker resources...'
                sh 'docker image prune -f'
            }
        }
    }

    post {
        success {
            echo '✅ Deployment complete.'
        }
        failure {
            echo '❌ Something went wrong during build/deploy.'
        }
    }
}

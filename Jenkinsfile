pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'p53-app-image'
        REPO_URL = 'https://github.com/your_username/p53-repo.git'  // Replace with your repo URL
    }

    triggers {
        githubPush()  // 👈 This triggers the pipeline on GitHub push
    }

    stages {
        stage('Checkout') {
            steps {
                git url: "${REPO_URL}", branch: 'main'
            }
        }

        stage('Build Docker Images') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE}-frontend ./frontend'
                    sh 'docker build -t ${DOCKER_IMAGE}-backend ./backend'
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    sh 'docker run --rm ${DOCKER_IMAGE}-frontend npm test || true'
                    sh 'docker run --rm ${DOCKER_IMAGE}-backend npm test || true'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh 'docker-compose -f docker-compose.yml up -d --build'
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                    sh 'docker system prune -f'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Build & Deployment Completed'
        }
        failure {
            echo '❌ Build or Deployment Failed'
        }
    }
}

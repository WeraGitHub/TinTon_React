pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "tinton-image"
        DOCKER_CONTAINER_NAME = "tinton-container"
    }

    stages {
        stage('Checkout'){
            steps {
                // Use the 'withCredentials' block to specify the GitHub credentials
                withCredentials([usernamePassword(credentialsId: '101', passwordVariable: 'GITHUB_TOKEN', usernameVariable: 'GITHUB_USER')]) {
                    git branch: 'main', credentialsId: '101', url: 'https://github.com/WeraGitHub/TinTon_React.git'
            }
        }
        stage('Build App'){
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Build Container'){
            steps {
                sh 'docker build -t $DOCKER_IMAGE_NAME .'
            }
        }
        stage('Test'){
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy'){
            steps {
                // stop and remove named container if it already exists - just in case
                sh 'docker stop $DOCKER_CONTAINER_NAME || true'
                sh 'docker rm $DOCKER_CONTAINER_NAME || true'
                sh 'docker run --name $DOCKER_CONTAINER_NAME -d -p 3000:3000 $DOCKER_IMAGE_NAME'
            }
        }
    }
}

pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // sh 'copy.bat'
                sh 'docker build -t uc1 ./uc1'
                sh 'docker tag uc1 asbark/uc1:latest'
                sh 'docker push asbark/uc1:latest'
                sh 'docker build -t uc2 ./uc2'
                sh 'docker tag uc2 asbark/uc2:latest'
                sh 'docker push asbark/uc2:latest'
                sh 'docker build -t uc3 ./uc3'
                sh 'docker tag uc3 asbark/uc3:latest'
                sh 'docker push asbark/uc3:latest'
                sh 'docker build -t frontend ./frontend'
                sh 'docker tag frontend asbark/frontend:latest'
                sh 'docker push asbark/frontend:latest'
            }
        }
        
        stage('Deploy') {
            steps {
                 sh 'kubectl apply -f kubernetes.yaml'
            }
        }
    }
    
    post {
        failure {
            echo 'Pipeline failed'
        }
    }
}

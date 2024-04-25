pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                // sh 'copy.bat'
                sh 'docker build -t syedasaniya153/uc1:latest ./uc1'
                sh 'docker push syedasaniya153/uc1:latest'
                sh 'docker build -t syedasaniya153/uc2:latest ./uc2'
                sh 'docker push syedasaniya153/uc2:latest'
                sh 'docker build -t syedasaniya153/uc3:latest ./uc3'
                sh 'docker push syedasaniya153/uc3:latest'
                sh 'docker build -t syedasaniya153/frontend:latest ./frontend'
                sh 'docker push syedasaniya153/frontend:latest'
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

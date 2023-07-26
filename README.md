
# TinTon 
### TinTon Game is a memory-based color pattern game built with React (`create-react-app`). The game presents a sequence of colored buttons to the player, who needs to remember the sequence and repeat it correctly to advance. The difficulty level increases as the sequence gets longer. The game keeps track of the player's score, and there's a scoreboard to display the top 5 scores.

https://github.com/WeraGitHub/TinTon_React/assets/67145460/dcfff8eb-c14a-4988-88cd-57253f0b1b18

<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >

## Getting started locally
### 1. Open up your local terminal and in your desired location clone the repository:
`git clone https://github.com/WeraGitHub/TinTon_React.git`

### 2. Navigate to the project directory:
`cd TinTon_React`

### 3. Install the dependencies:
`npm install`

### 4. (Optional) To run tests:
`npm test`

### 5. Start the application:
`npm start`

### 6. In case your browser window doesn't open automatically, go manually to http://localhost:3000.

### 7. Have fun 🥳!

<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >

## Deploying on AWS using Docker image
### 1. Connect to your EC2 instance (Amazon Linux AMI) via ssh.

### 2. Install Docker:

`sudo yum -y install docker`

`sudo systemctl start docker`

`sudo docker info`

### 3. Run the container based on the docker image from DockerHub:

`sudo docker run --name tinton-container -d -p 3000:3000 weronikadocker/tinton-react:v1`

### 4. In your broser navigate to your public ip address with :3000 at the end, like this: http://*your-public-IP-here*:3000 

### 5. Enjoy 🐶!


<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >

## CI/CD using AWS, Jenkins and Docker
### 1. AWS - create and connect to an EC2 instance
Create your ec2 instance with the elastic IP address and right security group

### 2. Connect to your instance via SSH

### 3. Install Jenkins

`sudo yum update -y`

`sudo yum install -y git`

`sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo`

`sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key`

`sudo yum upgrade`

`sudo amazon-linux-extras install java-openjdk11 -y`

`sudo yum install jenkins -y`

`sudo systemctl enable jenkins`

`sudo systemctl start jenkins`

`sudo cat /var/lib/jenkins/secrets/initialAdminPassword`


Browse to your PublicIP:8080 to unlock Jenkins and enter the initialAdminPassword you copied from the terminal.

Next install suggested plugins.

Then create first admin user with the following values:

Username: jenkinsadmin

Password: ***

Confirm password: ***

Fullname: jenkinsadmin

Email: jenkins@jenkins.com



###	4. Install Docker

`sudo yum -y install docker`

`sudo systemctl start docker`

`sudo docker info`

### Also, to not have to type sudo before docker commands everytime you can add your user to the group by:

`sudo gpasswd -a ec2-user docker`

Make sure you restart your ssh connection after that.


### 5. Add jenkins to a docker group

`sudo usermod -aG docker jenkins`

`sudo systemctl restart jenkins`


### 6. Install Node.js and npm on the EC2 instance

`sudo yum install -y nodejs npm`


### 7. Create and add Dockerfile to your project stored on GitHub

`vim Dockerfile`
   
```FROM node:19-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
```

### 8. Create GitHub webhook

Copy public IP of your instance

Navigate to Settings -> Webhook -> Add webhook

In Payload URL paste:

http://*your-public-IP-here*:8080/github-webhook/ 

In content type drop down choose: *application/x-www-form-urlencoded*

Select trigger option of *Just the push event.*

And click *Add webhook*
![image](https://user-images.githubusercontent.com/67145460/235289714-4d8fe2e8-6c86-43f5-b493-7fe8f4e49de2.png)




#### If your GitHub repo is private you need to create credentials in Jenkins – using ssh key and make sure you configure GitHub repo in a matching manner, before you start creating your Jenkins pipeline



### 9. Create Pipeline in Jenkins

Create and add Jenkinsfile to your project at root level:
```
pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = "tinton-image"
        DOCKER_CONTAINER_NAME = "tinton-container"
    }

    stages {
        stage('Checkout'){
            steps {
                // Use this one if the repo is public:
                git branch: 'main', url: 'https://github.com/WeraGitHub/TinTon_React.git'
                // And if it is private and you have credentials added in Jenkins with ID 101
                // use the 'withCredentials' block to specify the GitHub credentials:
                withCredentials([usernamePassword(credentialsId: '101', passwordVariable: 'GITHUB_TOKEN', usernameVariable:                           'GITHUB_USER')]) {
                   git branch: 'main', credentialsId: '101', url: 'https://github.com/WeraGitHub/TinTon_React.git'
                }
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
```
And now back in Jenkins:
1. Make sure you have NodeJS and NPM plugins installed
2. Create new item (job) - make it a pipeline
3. Tick Build Trigger: *GitHub hook trigger for GITScm polling*
4. In the Pipeline section: ![image](https://user-images.githubusercontent.com/67145460/235289498-9de3dee7-43bb-475b-8678-97f348edab00.png)
5. Click *Apply* then *Save*
6. *Build Now*
![image](https://user-images.githubusercontent.com/67145460/235289597-58ebbb0f-acec-40ad-90b9-199b96bcb724.png)

Our web app should be now available on http://*your-public-IP-here*:5000 

#### Next time you push any changes to your main branch on GitHub that will trigger new Build on Jenkins.

### 10.	:tada:	:tada:	:tada:  Enjoy 	:tada: 	:tada: 	:tada:


<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >
<br >

#### About this project
For planning purposes and tracking progress I used KanBan board in Trello:

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/8382418e-217a-4d3f-acba-a36de9494dfb" width="400" height="auto">
<br >
<br >

For design, Figma:

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/cfdcf39a-be63-4fff-8e2c-9de940d8f73a" width="400" height="auto">
<br >
<br >

Developed in React using Visual Studio Code:

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/2c6f88f1-4912-4d25-a565-f6228d5edc92" width="400" height="auto">
<br >
<br >

And you can find Dokerized image here: https://hub.docker.com/repository/docker/weronikadocker/tinton-react/general

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/5e07de4d-061e-4e93-8c16-1dcbb0678fb0" width="400" height="auto">

In order to create this image and push it to the registry, I have completed the following steps on my Amazon Linux EC2 instance:

1. installed Docker: `sudo yum -y install docker`, `sudo systemctl start docker`, `sudo docker info`
2. added Docker to our user group to not ahve to type *sudo* all the time: `sudo gpasswd -a ec2-user docker`, make sure you restart your ssh connection after that
3. cloned repo: `git clone https://github.com/WeraGitHub/TinTon_React.git`
4. navigated to the project folder: `cd TinTon_React`
5. created or used existing Dockerfile: `vim Dockerfile`
   
```FROM node:19-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
```

7. built docker image: `docker build -t weronikadocker/tinton-react:v1 .`
8. logged in to Docker Hub: `docker login`
9. pushed the built image: `docker push weronikadocker/tinton-react:v1`

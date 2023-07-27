
# TinTon 
#### TinTon Game is a memory-based color pattern game built with React (`create-react-app`). The game presents a sequence of colored buttons to the player, who needs to remember the sequence and repeat it correctly to advance. The difficulty level increases as the sequence gets longer. The game keeps track of the player's score, and there's a scoreboard to display the top 5 scores.

https://github.com/WeraGitHub/TinTon_React/assets/67145460/dcfff8eb-c14a-4988-88cd-57253f0b1b18

<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >

## Getting started locally
#### 1. Open up your local terminal and in your desired location clone the repository:
`git clone https://github.com/WeraGitHub/TinTon_React.git`

#### 2. Navigate to the project directory:
`cd TinTon_React`

#### 3. Install the dependencies:
`npm install`

#### 4. (Optional) To run tests:
`npm test`

#### 5. Start the application:
`npm start`

#### 6. In case your browser window doesn't open automatically, go manually to http://localhost:3000.

#### 7. Have fun 🥳!

<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >

## Deploying on AWS using Docker image
#### 1. Connect to your EC2 instance (Amazon Linux AMI) via ssh.

#### 2. Install Docker:

`sudo yum -y install docker`

`sudo systemctl start docker`

`sudo docker info`

#### 3. Run the container based on the docker image from DockerHub:

`sudo docker run --name tinton-container -d -p 3000:3000 weronikadocker/tinton-react:v1`

#### 4. In your broser navigate to your public ip address with :3000 at the end, like this: http://*your-public-IP-here*:3000 

#### 5. Enjoy 🐶!


<br >
<br >
🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶🐶
<br >
<br >
<br >

#### About this project
For planning purposes and tracking progress I used KanBan board in Trello:

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/4cb4c69d-29d2-4eb1-9064-37614b33ad31" width="400" height="auto">

<br >
<br >

For design, Figma:

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/447363ee-ee63-4fab-9e0d-7f15c8a4ce6f" width="400" height="auto">

<br >
<br >

Developed in React using Visual Studio Code:

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/9a30c7b1-62fb-49b2-9eba-9f58893dc355" width="400" height="auto">

<br >
<br >

And you can find Dokerized image here: https://hub.docker.com/repository/docker/weronikadocker/tinton-react/general

<img src="https://github.com/WeraGitHub/TinTon_React/assets/67145460/f386b4fb-e3de-4b38-8b62-eebd2b3ee4ba" width="400" height="auto">


In order to create this image and push it to the registry, I have completed the following steps on my Amazon Linux EC2 instance:

1. installed Docker: `sudo yum -y install docker`, `sudo systemctl start docker`, `sudo docker info`
2. added Docker to our user group to not have to type *sudo* all the time: `sudo gpasswd -a ec2-user docker`, make sure you restart your ssh connection after that
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

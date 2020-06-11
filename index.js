const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
 
const questions = [
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?"
  },
  {
    type: "input",
    name: "title",
    message: "What is your Repo Name?"
  },
  {
    type: "input",
    name: "description",
    message: "Write a few sentences about the purpose of your application/site."
  },
  {
    type: "input",
    name: "lanuages",
    message: "What technologies or languages did you use to build this application?",
  },
  {
    type: "input",
    message: "What are the steps to install the application?",
    name: "installation",
  },
  {
    type: "input",
    message: "Describe the usage of the application.",
    name: "usage",
  },
  {
    type: "input",
    message: "Add contributors",
    name: "contributors",
  },
  {
    type: "input",
    message: "Questions",
    name: "questions",
  }
]
 
const github = {
  getUser: function(username, inputData) {
    axios
    .get(`https://api.github.com/users/${username}`)
    .then(function(res) {
      userInfo(res, inputData)
  });
  }
}
 
 
 
const generateMarkdown = (userData, data) => {
  
  return `
# ${data.title}
![](${userData.data.avatar_url})
---------------------------
##Table Of Contents
1. Description
2. Technologies Used
3. Installation
4. Usage
5. Contributors
6. Questions?
----------------------------
## Description
${data.description}
## Technologies Used
${data.languages}
## Installation
${data.installation}
## Usage
${data.usage}
## Contributors
${data.contributors}
## Questions?
${data.questions}
`  
}
 
const userInfo = (userData, data) => {
  let readmeInfo =  generateMarkdown(userData, data);
  writeToFile("README.md", readmeInfo)
}
 

const clientQuestions = () =>{
  inquirer.prompt(questions).then(function(data) {
 
   github.getUser(data.username, data)
 
    console.log(data.title)

  });
}
 
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("----Your README has been created! Check your files to view.----");
  });
}
 
function start() {
  clientQuestions();
}
 
start();


// dependencies
const { OpenAI } = require('langchain/llms/openai');
require('dotenv').config();


// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({ 
    openAIApiKey: process.env.OPENAI_API_KEY, 
    temperature: 0,
    model: 'gpt-3.5-turbo'
  });
  
  console.log({ model });


// Uses the instantiated OpenAI wrapper, model, and makes a call based on input from inquirer
  const promptFunc = async () => {
    try {
        const res = await model.call(input);
        console.log(res);
    }
    catch (err) {
      console.error(err);
    }
  };

  const inquirer = require('inquirer');

 // function that, when called, will execute an inquirer prompt that will ask the user for a question
  const init = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Ask a coding question:',
      },
    ]).then((inquirerResponse) => {
      promptFunc(inquirerResponse.name)
    });
  };
  
  // Calls the initialization function and starts the script
  init();



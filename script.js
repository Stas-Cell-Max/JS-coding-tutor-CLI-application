// Dependencies
require("dotenv").config();
const inquirer = require("inquirer");
const { OpenAI } = require("langchain/llms/openai");

// The following dependencies are not required for this script to run, but are used to format the output
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");

// Creates and stores a wrapper for the OpenAI package along with basic configuration
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
  model: "gpt-3.5-turbo",
});

// With a 'StructuredOutputParser' we can define a schema for the output     
const parser = StructuredOutputParser.fromNamesAndDescriptions({
      // Define the output variables and their descriptions
    code: "Javascript code that answers the user's question",       
    explanation: "detailed explanation of the example code provided",     
  });    
  // Get the format instructions from the parser 
  const formatInstructions = parser.getFormatInstructions();
  
  const promptFunc = async (input) => {
    try {
      const prompt = new PromptTemplate({
        template:
          "You are a javascript expert and will answer the user's coding questions thoroughly as possible. \n{format_instructions}",
        inputVariables: ["question"],
        partialVariables: { format_instructions: formatInstructions },
      });
  
      const promptInput = await prompt.format({ question: input });
      
     
  
      const res = await model.call(promptInput);
      const parsedResult = await parser.parse(res);
  
      // Log the parsed result for debugging purposes
      console.log("Parsed Result:", parsedResult);
    } catch (err) {
      console.error("Error during promptFunc:", err);
    }
  };
  
// Initialization function that uses inquirer to prompt the user and returns a promise. It takes the user input and passes it through the call method
const init = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Ask a coding question",
      },
    ])
    .then((inquirerResponse) => {
      promptFunc(inquirerResponse.name);
    });
};
// Calls the intialization function and starts the script
init(); 
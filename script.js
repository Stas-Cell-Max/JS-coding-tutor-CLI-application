require('dotenv').config();
console.log(process.env.OPENAI_API_KEY);
const { OpenAI } = require('langchain/llms/openai');

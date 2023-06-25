import fetch from 'node-fetch'
import dotenv from 'dotenv';

dotenv.config();
export default async function chatGPTAsync(message, contexto) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const headers = {
    'Authorization': `Bearer ${process.env.APP_KEY}`,
    'Content-Type': 'application/json'
  };

  const data = {
    messages: contexto,
    model: 'gpt-3.5-turbo'
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  });


  const responseJson = await response.json();
  console.log(responseJson)
  if (responseJson.choices && responseJson.choices.length > 0) {
    const retornoApi = responseJson.choices[0].message.content;
    return retornoApi;
  } else {
    return null;
  }
}

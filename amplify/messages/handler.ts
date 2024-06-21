import { Handler } from 'aws-lambda';

const API_URL = 'https://zvi1mh9s4a.execute-api.eu-west-3.amazonaws.com/dev/messages';


export const handler: Handler = async (event, context) => {
  const requestBody = await JSON.parse(event.body);
  try {
    const res = await fetch(API_URL ,{
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    return res
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send message');
  }
};
import { Handler } from 'aws-lambda';
import { Amplify } from 'aws-amplify';
import { post } from 'aws-amplify/api';

const API_URL = 'https://zvi1mh9s4a.execute-api.eu-west-3.amazonaws.com/dev/messages';

Amplify.configure({
  API: {
    REST: {
      chatMessages: {
        endpoint: API_URL,
        region: 'eu-west-3',
      },
    },
  },
});

export const handler: Handler = async (event, context) => {
  const requestBody = await JSON.parse(event.body);
  try {
    const { body } = await fetch(API_URL ,{
      method: 'POST',
      body: JSON.stringify(requestBody),
    });
    const response = await body.json();
    return response
  } catch (error) {
    console.error(error);
    throw new Error('Failed to send message');
  }
};
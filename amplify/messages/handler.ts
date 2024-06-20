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
  const restOperation = post({
    apiName: 'chatMessages',
    path: API_URL,
    options: {
      body: requestBody,
    },
  });
	const { body } = await restOperation.response;
  const response = await body.json();
	return response
};
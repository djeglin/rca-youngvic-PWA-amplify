import axios from 'axios';
import { simulateDelay } from '@/src/utils/simulateDelay/simulateDelay';
import { FetchMessagesResponse, MessageData } from '../app/chat/chat.types';
import { Amplify } from 'aws-amplify';
import { post } from 'aws-amplify/api';

const API_URL = '/api/messages';

Amplify.configure({
  API: {
    REST: {
      'rca-youngvic-PWA-code': {
        endpoint: API_URL,
      },
    },
  },
});

export const fetchMessages = async (query: MessageData) => {
  try {
    const restOperation = post({
      apiName: 'rca-youngvic-PWA-code',
      path: API_URL,
      options: {
        body: query,
      },
    });
    // const response = await axios.post<FetchMessagesResponse>(API_URL, query);
    // const messages = response.data.parts;
    // let fullMessage = '';
    // for (let part of Object.keys(messages)) {
    //   fullMessage += `${messages[part]} \n`;
    // }
    // await simulateDelay({ message: fullMessage });

    // return fullMessage;

    const { body } = await restOperation.response;
    const response = await body.json();

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios error
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      // Handle other errors
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
    }
    throw error;
  }
};

import axios from 'axios';
import { simulateDelay } from '@/src/utils/simulateDelay/simulateDelay';
import { FetchMessagesResponse, MessageData } from '../app/chat/chat.types';

import { Amplify } from 'aws-amplify';

Amplify.configure({})

const API_URL = '/api/messages';

export const fetchMessages = async (query: MessageData): Promise<string> => {
  try {
    const response = await axios.post<FetchMessagesResponse>(API_URL, query);
    const messages = response.data.parts;
    let fullMessage = '';
    for (let part of Object.keys(messages)) {
      fullMessage += `${messages[part]} \n`;
    }
    await simulateDelay({ message: fullMessage });

    return fullMessage;
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

import { useQuery } from '@tanstack/react-query';

import { fetchMessages } from '../models/chatModel';
import { MessageData } from '../app/chat/chat.types';

export const useChatMessages = (query: MessageData) => {
  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['messages'],
    queryFn: () => fetchMessages(query),
  });
  return { data, isFetching, isSuccess };
};

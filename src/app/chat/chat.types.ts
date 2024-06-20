interface Parts {
  [key: string]: string;
}

export interface FetchMessagesResponse {
  number_of_parts: number;
  parts: Parts;
}

export type FormInput = {
  input: string;
};

export type MessageData = {
  user_id?: string;
  first_name?: string;
  last_name?: string;
  timestamp: string;
  type?: string;
  text: string;
  fromUser?: boolean;
};

export type MessagesData = MessageData[];

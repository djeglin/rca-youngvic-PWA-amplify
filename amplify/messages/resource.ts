import { defineFunction } from '@aws-amplify/backend';

export const messages = defineFunction({
  name: 'messages',
  entry: './handler.ts'
});
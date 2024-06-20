import { defineBackend } from '@aws-amplify/backend';
import { messages } from './messages/resource';

defineBackend({
  messages
});

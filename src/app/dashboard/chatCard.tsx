import React from 'react';
import { chatCardType } from '@/src/app/dashboard/chatCard.types';

const ChatCard = ({ title, subtitle, url, image }: chatCardType) => (
  <div>
    <a
      href="/chat"
      className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex bg-white mb-4 text-primary-dark-brown rounded-md"
    >
      {image && (
        <div className="flex-shrink-0">
          <img className="w-10 h-10" src={image} alt={title} />
        </div>
      )}
      <div className="flex-1 min-w-0 ms-4">
        <p className="text-sm font-bold truncate pb-1">{title}</p>
        <p className="text-sm truncate ">{subtitle}</p>
      </div>
    </a>
  </div>
);
export default ChatCard;

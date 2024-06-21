'use client';

import Image from 'next/image';
import ChatCard from '@/src/app/dashboard/chatCard';

export default function Dashboard() {
  const cards = [
    { title: 'Soldier', subtitle: 'Start chat', url: '/chat', image: './soldier-avatar.png' },
    {
      title: 'Soldier & Wanda',
      subtitle: 'View chat',
      url: '',
      image: './soldier_wanda-avatar.png',
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center border-transparent">
      <div className="flex flex-col bg-cover justify-center items-center bg-center border-transparent h-40 w-full bg-dashboard-circle">
        <div className="flex flex-col justify-center items-center text-center p-6 border-transparent shadow-none pt-1 pb-1">
          <Image
            src="/la-ronde-logo-light.svg"
            width={145}
            height={50}
            alt="La Ronde Logo"
            priority={true}
          />
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-1 ">
        <div className="flex flex-col p-4 border-transparent shadow-none w-96">
          <div className="text-wrap text-white font-oswald uppercase tracking-wide w-25 pb-4">
            Chats
          </div>
          {cards.map(({ title, subtitle, url, image }, index) => (
            <ChatCard
              key={`card-${index}`}
              title={title}
              subtitle={subtitle}
              url={url}
              image={image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

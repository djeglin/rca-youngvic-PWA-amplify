'use client';

import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '../../components/ui/card';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useForm } from 'react-hook-form';
import { FormInput, MessageData, MessagesData } from './chat.types';
import Cookies from 'js-cookie';

import { fetchMessages } from '@/src/models/chatModel';
import { formatMessageTime } from '@/src/utils/formatMessageTime/formatMessageTime';
import LoadingIndicator from '@/src/app/chat/loadingIndicator';
import { format, isToday, parseISO } from 'date-fns';

export default function Chat() {
  const { handleSubmit, register, reset } = useForm<FormInput>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [userId, setUserId] = useState<string>();
  const [messages, setMessages] = useState<MessagesData>([]);
  const [pendingMessages, setPendingMessages] = useState<string[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const [readyToSend, setReadyToSend] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const bot = {
    first_name: 'Soldier',
    last_name: '',
    timestamp: '',
    text: '',
  };

  useEffect(() => {
    setFirstName(Cookies.get('first_name'));
    setLastName(Cookies.get('last_name'));
    setUserId(Cookies.get('user_id'));
  }, []);

  const onSubmit = ({ input }: FormInput) => {
    if (input.trim() !== '') {
      const newMessage: MessageData = {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        timestamp: new Date().toISOString(),
        type: 'text',
        text: input,
        fromUser: true,
      };
      //setMessages((prevMessages) => [...prevMessages, newMessage]);
      setPendingMessages([...pendingMessages, input]);
      setMessages([...messages, newMessage]);
      reset();
      // Clear any existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // Set a new timer
      timerRef.current = setTimeout(() => {
        setReadyToSend(true);
      }, 10000); // 10 seconds timer, adjust to 60000 for 1 minutes if needed
    }
  };

  const handleApiCall = useCallback(async () => {
    setIsFetching(true);
    if (pendingMessages.length > 0) {
      const concatenatedText = pendingMessages.join(' ');
      const concatedMessageData: MessageData = {
        user_id: userId,
        first_name: firstName,
        last_name: lastName,
        timestamp: new Date().toISOString(),
        type: 'text',
        text: concatenatedText,
        fromUser: true,
      };
      const messageResponse = await fetchMessages(concatedMessageData);
      console.log({ messageResponse });
      // const botMessage = {
      //   ...bot,
      //   timestamp: new Date().toISOString(),
      //   text: messageResponse,
      //   fromUser: false,
      // };
      // setMessages((prevMessages) => [...prevMessages, botMessage]);
      setPendingMessages([]);
    }
    setIsFetching(false);
  }, [pendingMessages]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current?.scrollHeight;
    }
  };

  useEffect(() => {
    if (!!readyToSend) {
      handleApiCall();
      setReadyToSend(false);
    }
  }, [pendingMessages, readyToSend]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className="flex flex-col h-screen justify-between border-transparent bg-primary-dark-brown shadow-none">
      <CardHeader className="w-full">
        <div className="text-wrap text-center text-white font-oswald uppercase tracking-wide pt-6">
          Soldier
        </div>
      </CardHeader>

      <CardContent
        className="flex flex-col mb-auto h-screen overflow-auto h-full bg-secondary-brown py-5"
        ref={messagesContainerRef}
      >
        {messages.length === 0 && (
          <div className="flex flex-col justify-center items-center text-center p-6 border-transparent shadow-none pt-32 font-inter">
            <div className="text-wrap text-center text-secondary-cream font-normal size-52">
              <img className="object-scale-down" src="/assets/soldier.png" alt="Soldier" />
            </div>
            <div className="text-wrap text-base text-center text-secondary-cream font-bold pt-5 leading-6 tracking-wide">
              Soldier is active now
            </div>
            <div className="text-slate-700 text-center text-secondary-cream text-md font-normal tracking-wide pt-1">
              Start a message to get started
            </div>
          </div>
        )}
        {messages.map(({ first_name, last_name, text, timestamp, fromUser }, index) => {
          return (
            <div key={index}>
              {index === 0 && (
                <div className="flex flex-col justify-center items-center text-center font-inter">
                  <div className="text-wrap w-18 text-center text-secondary-cream font-normal bg-primary-dark-brown mb-4 py-2 px-2 rounded-3xl">
                    {isToday(parseISO(timestamp)) ? 'Today' : format(parseISO(timestamp), 'MM dd')}
                  </div>
                </div>
              )}
              <div className="flex-col-reverse">
                <div
                  className={`flex flex-col mb-4 py-3 px-4 w-80 text-sm rounded-md ${fromUser ? 'float-right justify-end bg-secondary-cream text-primary-dark-brown' : 'justify-start bg-primary-dark-brown'}`}
                  key={index}
                >
                  <div className="text-slate-700 text-xs font-medium pb-3">{`${first_name} ${last_name}`}</div>
                  <div className="text-wrap text-base font-normal pb-3">{text}</div>
                  <div className="text-slate-700 text-right text-xs font-light">
                    {formatMessageTime(timestamp)}
                  </div>
                </div>
                <div className="clear-both"></div>
              </div>
            </div>
          );
        })}
        {isFetching && (
          <div>
            <div className="text-slate-700 text-xs font-medium ">{`${bot.first_name} ${bot.last_name}`}</div>
            <LoadingIndicator />
          </div>
        )}
      </CardContent>
      <CardFooter className="w-full bottom-0 p-4 pr-0">
        <form className="w-full flex" onSubmit={handleSubmit(onSubmit)}>
          <Input
            autoComplete="off"
            className="flex w-full text-wrap text-black placeholder-gray-800  rounded-md "
            type="text"
            placeholder="Enter message"
            required
            {...register('input')}
            onBlur={() => setIsInputFocused(false)}
            onFocus={() => setIsInputFocused(true)}
          />
          <Button type="submit">
            <img src={isInputFocused ? '/assets/send-on.png' : '/assets/send-off.png'} alt="Send" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}

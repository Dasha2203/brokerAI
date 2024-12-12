'use client';

import robotAnimation from '@/animations/robot1.json';
import typingAnimation from '@/animations/typing.json';
import PlaneIcon from '@/icons/PlaneIcon';
import clsx from 'clsx';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import Button from '../buttons/Button';
import Input from '../forms/Input';

export type HistoryItem = {
  id: number;
  from: 'bot' | 'me';
  text: string;
};

let str = '';

const ChatBot = () => {
  const [isStart, setIsStart] = useState(false);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeMessage, setActiveMessage] = useState('');
  const [isShow, setIsShow] = useState(false);
  // const text = useRef('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;
    const ws = new WebSocket(`ws://213.148.11.27:8765/?token=${token}`);
    setWs(ws);
    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.code === 'ready') {
        setIsStart(true);
        return;
      }

      if (data.code === 'start_chunk') {
        setIsTyping(true);
        return;
      }

      if (data.code === 'end_chunk') {
        const m = str.trim();
        setHistory((prev) => [
          {
            id: Date.now(),
            from: 'bot',
            text: m,
          },
          ...prev,
        ]);
        setActiveMessage(prev => '');
        setIsTyping(false);
        str = '';
        return;
      }

      if (data.code === 'prompt_chunk') {
        if (data.text.trim()) {
          setActiveMessage((prev) => prev + data.text.toString());
          str += data.text.toString();
          // text.current += data.text.toString();
        }
        return;
      }
    };
    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
    return () => {
      ws.close();
    };
  }, []);

  function handleChangeMessage(value: string | null) {
    setMessage(value || '');
  }

  function handleSendMessage() {
    if (!ws) return;
    setHistory((prev) => [
      {
        id: Date.now(),
        from: 'me',
        text: message,
      },
      ...prev,
    ]);
    ws.send(
      JSON.stringify({
        command: 'CHAT_BOT_MESSAGE',
        prompt: message,
      }),
    );
    setMessage('');
  }

  function handleShowChat() {
    setIsShow((prev) => !prev);
  }

  return (
    <div className="fixed bottom-0 right-0 w-full max-w-[370px]">
      {isStart && (
        <div>
          <div className="pr-4">
            <div
              className={clsx(
                'px-4 w-full rounded-[14px] shadow-[0_4px_4px_0_rgba(0,0,0,0.12)]',
                // light
                'bg-white',
                'dark:bg-violet-800 transition-all',
                {
                  'opacity-0 invisible h-0 py-0': !isShow,
                  'py-8': isShow
                },
              )}
            >
              <div className="relative h-[400px] flex gap-6 flex-col-reverse overflow-y-auto track">
                {activeMessage && (
                  <div
                    className={clsx(
                      'rounded-b-[14px] rounded-tr-[14px] pt-2.5 px-2 pb-8 max-w-[70%]',
                      'bg-gray-100 ',
                      'dark:bg-violet-400',
                    )}
                  >
                    {activeMessage}
                  </div>
                )}
                {history.map((msg) => (
                  <div
                    key={msg.id}
                    className={clsx('pt-2.5 px-2 pb-2 max-w-[70%] text-sm', {
                      'bg-gray-100 dark:bg-violet-400 rounded-b-[14px] rounded-tr-[14px]':
                        msg.from === 'bot',
                      'ml-auto bg-gray-100 rounded-b-[14px] rounded-tl-[14px] text-white bg-gradient-to-r from-[#6418C3] to-[#AB18C3]':
                        msg.from === 'me',
                    })}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <Lottie
                loop={true}
                animationData={typingAnimation}
                className={clsx(
                  'h-6 w-12 relative z-[1] transition-transform',
                  {
                    'translate-y-full': !isTyping,
                    'translate-y-0': isTyping,
                  },
                )}
              />
              <form className="pt-3 relative z-[2] flex items-stretch gap-2 bg-white dark:bg-violet-800">
                <Input
                  value={message}
                  onChange={handleChangeMessage}
                  className="flex-grow-1 w-full md:text-sm"
                  placeholder="I can help you! Type your message here..."
                />
                <Button
                  as="button"
                  uiColor="primary"
                  variant="contained"
                  onClick={handleSendMessage}
                  size="sm"
                  className="xs:py-2.5 md:px-2.5 flex-shrink-0 flex items-center justify-center"
                >
                  <PlaneIcon className="w-6 h-6" />
                </Button>
              </form>
            </div>
          </div>
          <button
            className="ml-auto flex items-center justify-center bg-transparent border-none"
            onClick={handleShowChat}
          >
            <Lottie
              loop={true}
              animationData={robotAnimation}
              className="w-24 h-24 md:w-32 md:h-32"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Logo from './DoWhile';
import { api } from '../../services/api';
import io from 'socket.io-client';

type Message = {
  id: string;
  text: string;
  author: {
    name: string;
    avatar_url: string;
  }
}

const messagesQueue: Message[] = [] ;

const socket = io('http://localhost:4000');

socket.on('new_message', (data) => {
  messagesQueue.push(data);
})

export function MessageList() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean))
      }
    }, 3000);

    messagesQueue.shift();
    
  }, [])

  useEffect(() => {
    api.get<Message[]>('messages/last').then(async (res) => {
     setIsLoading(true);
      await setMessages(res.data);
      setIsLoading(false);
      console.log(messages);
    });
    return () => {
     
    }
  }, []);

  // if (isLoading) {
  //   return 'Carregando...';
  // }

  return (
    <div className={styles.messageListWrapper}>
      <Logo />

      <ul className={styles.messageList}>

        { messages && messages.length > 0 && messages.map((message) => {
          return (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>
                {message.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={message.author.avatar_url}
                    alt={message.author.name}
                  />
                </div>
                <span>{message.author.name}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
};


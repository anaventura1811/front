import { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import Logo from './DoWhile';
import { api } from '../../services/api';

type Message = {
  id: string;
  text: string;
  author: {
    name: string;
    avatar_url: string;
  }
}

export function MessageList() {

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    api.get<Message[]>('messages/last').then((res) => {
     setIsLoading(true);
      setMessages(res.data);
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

        { messages.map((message) => {
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


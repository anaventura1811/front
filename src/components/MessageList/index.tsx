import styles from './styles.module.scss';
import logo from '../../assets/logo.svg';

export function MessageList() {
  return (
    <div className={styles.messageListWrapper}>
      <img src={logo} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar este evento, com certeza vai ser o melhor de todos os tempos! Vamo pra cima!!🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/anaventura1811.png" alt="Ana Ventura"
              />
            </div>
            <span>Ana Ventura</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar este evento, com certeza vai ser o melhor de todos os tempos! Vamo pra cima!!🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/anaventura1811.png" alt="Ana Ventura"
              />
            </div>
            <span>Ana Ventura</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>
            Não vejo a hora de começar este evento, com certeza vai ser o melhor de todos os tempos! Vamo pra cima!!🔥🔥
          </p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img
                src="https://github.com/anaventura1811.png" alt="Ana Ventura"
              />
            </div>
            <span>Ana Ventura</span>
          </div>
        </li>
        
      </ul>
    </div>
  );
};


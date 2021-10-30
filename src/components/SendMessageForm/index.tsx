import { useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';
import { useAuthContext } from '../../contexts/auth';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export function SendMessageForm() {
  const { user, signOut } = useAuthContext();
  const [text, setText] = useState('');

  const handleSendMessage = async (ev: FormEvent) => {
    ev.preventDefault();

    if (!text) {
      return;
    }

    await api.post('messages', { text });

    setText('');
  }

  return (
    <div className={styles.sendMessageWrapper}>
      <button onClick={signOut} type="button" className={styles.signOutButton}>
        <VscSignOut size={32}/>
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name}/>
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16}/>
          {user?.login}
        </span>
      </header>

      <form onSubmit={(ev) => handleSendMessage(ev)} className={styles.sendMessageForm}>
        <label htmlFor={"message"}>
          Mensagem
        </label>
        <textarea
          name="message"
          id="message"
          value={text}
          placeholder="Qual a sua expectativa para o evento?"
          onChange={(ev) => setText(ev.target.value)}
        />

        <button type="submit">Enviar mensagem</button>
      </form>
    </div>
  )
};
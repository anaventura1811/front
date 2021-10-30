import styles from './app.module.scss';
import { LoginBox } from './components/LoginBox';
import { MessageList } from './components/MessageList';
import { SendMessageForm } from './components/SendMessageForm';
import { useAuthContext } from './contexts/auth';

function App() {

  const { user } = useAuthContext();

  return (
    <main className={`${styles.contentWrapper} ${!!user && styles.contentSignedIn}`}>
      <MessageList />
      { !!user ? <SendMessageForm /> : <LoginBox />}
     </main>
  );
};

export default App;

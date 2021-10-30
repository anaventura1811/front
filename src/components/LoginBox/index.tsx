import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { useAuthContext } from '../../contexts/auth';

export function LoginBox() {

 const { signInUrl } = useAuthContext();

  return (
    <div className={styles.loginBoxContainer}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
};

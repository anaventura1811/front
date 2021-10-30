import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import 'dotenv/config';

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=http://localhost:3000/`;

  return (
    <div className={styles.loginBoxContainer}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href="#" className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entrar com Github
      </a>
    </div>
  );
};

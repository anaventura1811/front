import { useEffect } from 'react';
import styles from './styles.module.scss';
import { VscGithubInverted } from 'react-icons/vsc';
import { api } from '../../services/api';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    avatar_url: string;
    name: string;
    login: string;
  }
}

const CLIENT_ID = import.meta.env.VITE_APP_GITHUB_CLIENT_ID;

export function LoginBox() {
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${CLIENT_ID}&redirect_uri=http://localhost:3000/`;

  const signIn = async (code: string) => {
    const response = await api.post<AuthResponse>('authenticate', {
      code,
    });

    const { token, user } = response.data;

    localStorage.setItem('@doWhile:token', token);

    console.log(user);

  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=');

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=');

      window.history.pushState({}, '', urlWithoutCode);
      // console.log({ urlWithoutCode, githubCode});
      signIn(githubCode);
    }
    return () => {
     
    }
  }, []);

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

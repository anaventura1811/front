import styles from './styles.module.scss';

export function LoginBox() {
  return (
    <div className={styles.loginBoxContainer}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href="#" className={styles.signInWithGithub}>
        Entrar com Github
      </a>
    </div>
  )
};

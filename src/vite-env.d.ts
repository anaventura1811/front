/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_GITHUB_CLIENT_ID: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
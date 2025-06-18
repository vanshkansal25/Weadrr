/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_OPENWEATHER_API_KEY: string;
  // Add other env variables here if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
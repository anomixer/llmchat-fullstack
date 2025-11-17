/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_OLLAMA_API_URL?: string
    readonly VITE_OLLAMA_API_KEY?: string
    readonly VITE_ALLOWED_HOSTS?: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
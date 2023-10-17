/// <reference types="vite/client" />
export interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_APP_BASE_API: string;
    readonly VITE_SERVER: string;
    readonly VITE_PORT: number;
}
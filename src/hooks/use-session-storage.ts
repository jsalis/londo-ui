import { useStorage } from "./use-storage";

/**
 * Uses state that syncs with session storage.
 */
export function useSessionStorage(key: string, initialState?: any) {
    return useStorage(window.sessionStorage, key, initialState);
}

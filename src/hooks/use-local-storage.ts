import { useStorage } from "./use-storage";

/**
 * Uses state that syncs with local storage.
 */
export function useLocalStorage(key: string, initialState?: any) {
    return useStorage(window.localStorage, key, initialState);
}

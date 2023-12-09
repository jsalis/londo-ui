import { isFunction } from "../utils/type-util";

import { useEventListener } from "./use-event-listener";

type UnloadBlockerOptions = {
    enabled?: boolean | (() => boolean);
    onBlock?: () => void;
};

/**
 * Uses a conditional dialog to confirm that the user wants to leave the page.
 */
export function useUnloadBlocker({ enabled, onBlock }: UnloadBlockerOptions = {}) {
    useEventListener(
        "beforeunload",
        (event) => {
            if (isFunction(enabled) ? enabled() : enabled) {
                event.preventDefault();
                // @ts-ignore
                event.returnValue = "Changes you made may not be saved.";
                onBlock?.();
            }
        },
        window
    );
}

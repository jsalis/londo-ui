import { useCallbackRef } from "./use-callback-ref";
import { useEventListener } from "./use-event-listener";

const alphaRegex = /^[a-zA-Z]$/;

/**
 * Uses an action triggered by a hot key shortcut.
 */
export function useHotKey(keyPattern: string, callback: () => void) {
    const savedCallback = useCallbackRef(callback);

    useEventListener(
        "keydown",
        (event) => {
            const keyEvent = event as KeyboardEvent;
            if (isValidTarget(keyEvent) && matchesPattern(keyEvent, keyPattern)) {
                event.preventDefault();
                savedCallback();
            }
        },
        window,
        true
    );
}

function isValidTarget(event: KeyboardEvent) {
    const el = event.target as HTMLElement;
    return (
        !event.repeat &&
        !el.isContentEditable &&
        el.tagName !== "INPUT" &&
        el.tagName !== "SELECT" &&
        el.tagName !== "TEXTAREA"
    );
}

function matchesPattern(event: KeyboardEvent, keyPattern: string) {
    const [key, ...modifiers] = keyPattern.split("+").reverse();
    return (
        event.key.toLowerCase() === key.toLowerCase() &&
        (!alphaRegex.test(event.key) || matchesModifiers(event, modifiers))
    );
}

function matchesModifiers(event: KeyboardEvent, modifiers: string[]) {
    if (event.altKey || event.ctrlKey) {
        return false;
    }
    return (
        modifiers.includes("meta") === event.metaKey &&
        modifiers.includes("shift") === event.shiftKey
    );
}

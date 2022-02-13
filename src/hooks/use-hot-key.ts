import { useCallbackRef } from "./use-callback-ref";
import { useEventListener } from "./use-event-listener";

/**
 * Uses an action triggered by a hot key shortcut.
 */
export function useHotKey(keyPattern: string, callback: () => void) {
    const savedCallback = useCallbackRef(callback);

    useEventListener(
        "keydown",
        (event) => {
            if (isValidTarget(event) && matchesPattern(event as KeyboardEvent, keyPattern)) {
                event.preventDefault();
                savedCallback();
            }
        },
        window,
        true
    );
}

function isValidTarget(event: Event) {
    const el = event.target as HTMLElement;
    return (
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
        !event.repeat &&
        matchesModifiers(event, modifiers)
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

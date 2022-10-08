import { useMemo, useState, useEffect } from "react";

import { isFunction, isString, isDefined } from "../utils/type-util";

import { useEventListener } from "./use-event-listener";
import { useUpdateEffect } from "./use-update-effect";

const CHANGE_EVENT_NAME = "storagechange";

/**
 * Uses state that syncs with browser storage.
 */
export function useStorage(storage: Storage, key: string, initialState?: any) {
    const id = useMemo(() => Math.random().toString(), []);
    const [state, setState] = useState(() => getInitialState(storage, key, initialState));

    useEventListener(
        CHANGE_EVENT_NAME,
        (event) => {
            const detail = (event as CustomEvent).detail;
            if (detail.key === key && detail.id !== id) {
                setState(detail.state);
            }
        },
        window
    );

    useUpdateEffect(() => {
        setState(() => getInitialState(storage, key, initialState));
    }, [key]);

    useEffect(() => {
        try {
            const storageValue = storage.getItem(key);
            const nextValue = JSON.stringify(state);

            if (storageValue !== nextValue) {
                storage.setItem(key, nextValue);
                window.dispatchEvent(
                    new CustomEvent(CHANGE_EVENT_NAME, {
                        detail: { id, key, state },
                    })
                );
            }
        } catch {} // eslint-disable-line no-empty
    }, [state]);

    return [state, setState] as const;
}

function getInitialState(storage: Storage, key: string, initialState: any) {
    try {
        const storageValue = storage.getItem(key);

        if (isString(storageValue)) {
            return unpack(initialState, JSON.parse(storageValue));
        } else {
            const value = unpack(initialState);
            storage.setItem(key, JSON.stringify(value));
            return value;
        }
    } catch {
        return unpack(initialState);
    }
}

function unpack(initial: any, value?: any) {
    if (isFunction(initial)) {
        return initial(value);
    }

    if (isDefined(value)) {
        return value;
    }

    return initial;
}

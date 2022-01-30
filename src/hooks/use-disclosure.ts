import { useState, useRef, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

type DisclosureOptions = {
    defaultIsOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
};

type ToggleOptions = {
    delay?: number;
};

/**
 * Uses boolean state with functions to open, close, and toggle.
 */
export function useDisclosure({ defaultIsOpen, onOpen, onClose }: DisclosureOptions = {}) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen ?? false);
    const delayTimer: any = useRef(null);

    const clearDelayTimer = () => {
        clearTimeout(delayTimer.current);
        delayTimer.current = null;
    };

    useEffect(() => clearDelayTimer, []);

    const open = useCallbackRef((opt: ToggleOptions = {}) => {
        clearDelayTimer();
        const fn = () => {
            if (!isOpen) {
                setIsOpen(true);
                onOpen?.();
            }
        };
        if (opt.delay) {
            delayTimer.current = setTimeout(fn, opt.delay);
        } else {
            fn();
        }
    });

    const close = useCallbackRef((opt: ToggleOptions = {}) => {
        clearDelayTimer();
        const fn = () => {
            if (isOpen) {
                setIsOpen(false);
                onClose?.();
            }
        };
        if (opt.delay) {
            delayTimer.current = setTimeout(fn, opt.delay);
        } else {
            fn();
        }
    });

    const toggle = useCallbackRef((opt: ToggleOptions = {}) => {
        if (isOpen) {
            close(opt);
        } else {
            open(opt);
        }
    });

    return { isOpen, open, close, toggle, clearDelayTimer };
}

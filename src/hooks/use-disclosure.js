import { useState, useRef, useEffect } from "react";

import { useCallbackRef } from "./use-callback-ref";

/**
 * Uses boolean state with functions to open, close, and toggle.
 *
 * @param   {Object}   [options]
 * @param   {Boolean}  [options.defaultIsOpen]
 * @param   {Function} [options.onOpen]
 * @param   {Function} [options.onClose]
 * @returns {{
 *     isOpen: Boolean,
 *     open: function(delay: Number),
 *     close: function(delay: Number),
 *     toggle: function(delay: Number),
 *     clearDelayTimer: function()
 * }}
 */
export function useDisclosure({ defaultIsOpen = false, onOpen, onClose } = {}) {
    const [isOpen, setIsOpen] = useState(defaultIsOpen);
    const delayTimer = useRef(null);

    const clearDelayTimer = () => {
        clearTimeout(delayTimer.current);
        delayTimer.current = null;
    };

    useEffect(() => clearDelayTimer, []);

    const open = useCallbackRef(({ delay } = {}) => {
        clearDelayTimer();
        const fn = () => {
            if (!isOpen) {
                setIsOpen(true);
                onOpen?.();
            }
        };
        if (delay) {
            delayTimer.current = setTimeout(fn, delay);
        } else {
            fn();
        }
    });

    const close = useCallbackRef(({ delay } = {}) => {
        clearDelayTimer();
        const fn = () => {
            if (isOpen) {
                setIsOpen(false);
                onClose?.();
            }
        };
        if (delay) {
            delayTimer.current = setTimeout(fn, delay);
        } else {
            fn();
        }
    });

    const toggle = useCallbackRef((opt) => {
        if (isOpen) {
            close(opt);
        } else {
            open(opt);
        }
    });

    return { isOpen, open, close, toggle, clearDelayTimer };
}

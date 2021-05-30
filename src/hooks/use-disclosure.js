import { useState, useRef, useEffect, useCallback } from "react";

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

    const open = useCallback(
        ({ delay } = {}) => {
            clearDelayTimer();
            const fn = () => {
                setIsOpen(true);
                onOpen?.();
            };
            if (delay) {
                delayTimer.current = setTimeout(fn, delay);
            } else {
                fn();
            }
        },
        [onOpen]
    );

    const close = useCallback(
        ({ delay } = {}) => {
            clearDelayTimer();
            const fn = () => {
                setIsOpen(false);
                onClose?.();
            };
            if (delay) {
                delayTimer.current = setTimeout(fn, delay);
            } else {
                fn();
            }
        },
        [onClose]
    );

    const toggle = useCallback(
        (opt) => {
            if (isOpen) {
                close(opt);
            } else {
                open(opt);
            }
        },
        [isOpen, open, close]
    );

    return { isOpen, open, close, toggle, clearDelayTimer };
}

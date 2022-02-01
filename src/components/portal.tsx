import { createContext, useContext, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

import { isFunction } from "../utils/type-util";

export interface PortalProps {
    container?: HTMLElement | (() => HTMLElement);
    onMount?: () => void;
    onUnmount?: () => void;
    children: React.ReactNode;
}

const PortalContext = createContext<HTMLElement | undefined>(undefined);

export function Portal({ container, onMount, onUnmount, children }: PortalProps) {
    const [portal] = useState(() => document.createElement("div"));
    const parentPortal = useContext(PortalContext);

    useLayoutEffect(() => {
        const containerEl = isFunction(container) ? container() : container;
        const el = containerEl ?? parentPortal ?? document.body;
        el?.appendChild(portal);
        onMount?.();
        return () => {
            onUnmount?.();
            if (el?.contains(portal)) {
                el?.removeChild(portal);
            }
        };
    }, [container, portal, parentPortal]);

    return createPortal(
        <PortalContext.Provider value={portal}>{children}</PortalContext.Provider>,
        portal
    );
}

if (process.env.NODE_ENV !== "production") {
    Portal.displayName = "Portal";
}

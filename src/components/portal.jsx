import { createContext, useContext, useState, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { HTMLElementType } from "../../utils/prop-types";
import { isFunction } from "../../utils/type-util";

const PortalContext = createContext(undefined);

export function Portal({ container, onMount, onUnmount, children }) {
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

Portal.propTypes = {
    container: PropTypes.oneOfType([HTMLElementType, PropTypes.func]),
    onMount: PropTypes.func,
    onUnmount: PropTypes.func,
    children: PropTypes.node,
};

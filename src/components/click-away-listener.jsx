import { cloneElement, useRef, useEffect } from "react";
import PropTypes from "prop-types";

import { useForkRef, useCallbackRef } from "../hooks";
import { ownerDocument } from "../utils/dom-util";

function mapEventPropToEvent(eventProp) {
    return eventProp.substring(2).toLowerCase();
}

function clickedRootScrollbar(event, doc) {
    return (
        doc.documentElement.clientWidth < event.clientX ||
        doc.documentElement.clientHeight < event.clientY
    );
}

function isInsideDom(event, doc, el) {
    if (event.composedPath) {
        return event.composedPath().indexOf(el) > -1;
    }
    return !doc.documentElement.contains(event.target) || el.contains(event.target);
}

export function ClickAwayListener(props) {
    const { children, disableReactTree, mouseEvent, onClickAway } = props;

    const nodeRef = useRef(null);
    const activatedRef = useRef(false);
    const syntheticEventRef = useRef(false);
    const handleRef = useForkRef(children.ref, nodeRef);

    useEffect(() => {
        // Ensure that this component is not "activated" synchronously.
        // https://github.com/facebook/react/issues/20074
        setTimeout(() => {
            activatedRef.current = true;
        }, 0);
        return () => {
            activatedRef.current = false;
        };
    }, []);

    const handleClickAway = useCallbackRef((event) => {
        // Given developers can stop the propagation of the synthetic event,
        // we can only be confident with a positive value.
        const insideReactTree = syntheticEventRef.current;
        syntheticEventRef.current = false;

        const doc = ownerDocument(nodeRef.current);

        // 1. IE11 support, which trigger the handleClickAway even after the unbind
        // 2. The child might render null.
        // 3. Behave like a blur listener.
        if (
            !activatedRef.current ||
            !nodeRef.current ||
            ("clientX" in event && clickedRootScrollbar(event, doc))
        ) {
            return;
        }

        if (!isInsideDom(event, doc, nodeRef.current) && (disableReactTree || !insideReactTree)) {
            onClickAway(event);
        }
    });

    useEffect(() => {
        if (mouseEvent !== false) {
            const eventName = mapEventPropToEvent(mouseEvent);
            const doc = ownerDocument(nodeRef.current);

            doc.addEventListener(eventName, handleClickAway);

            return () => {
                doc.removeEventListener(eventName, handleClickAway);
            };
        }
    }, [handleClickAway, mouseEvent]);

    const childrenProps = { ref: handleRef };

    if (mouseEvent !== false) {
        // Keep track of mouse events that bubbled up through the portal
        childrenProps[mouseEvent] = (event) => {
            syntheticEventRef.current = true;
            children.props[mouseEvent]?.(event);
        };
    }

    return <>{cloneElement(children, childrenProps)}</>;
}

ClickAwayListener.propTypes = {
    children: PropTypes.node,
    disableReactTree: PropTypes.bool,
    mouseEvent: PropTypes.oneOf(["onClick", "onMouseDown", "onMouseUp", false]),
    onClickAway: PropTypes.func.isRequired,
};

ClickAwayListener.defaultProps = {
    disableReactTree: false,
    mouseEvent: "onClick",
};

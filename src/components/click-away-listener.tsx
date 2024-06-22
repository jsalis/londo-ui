import { cloneElement, useRef, useEffect } from "react";

import { useForkRef, useCallbackRef } from "../hooks";
import { ownerDocument } from "../utils/dom-util";

export interface ClickAwayListenerProps {
    disableReactTree?: boolean;
    mouseEvent?: "onClick" | "onMouseDown" | "onMouseUp" | false;
    onClickAway?: (event: MouseEvent) => void;
    children: React.ReactElement;
}

function mapEventPropToEvent(eventProp: string) {
    return eventProp.substring(2).toLowerCase();
}

function clickedRootScrollbar(event: MouseEvent, doc: Document) {
    return (
        doc.documentElement.clientWidth < event.clientX ||
        doc.documentElement.clientHeight < event.clientY
    );
}

function isInsideDom(event: MouseEvent, doc: Document, el: HTMLElement) {
    if (event.composedPath) {
        return event.composedPath().indexOf(el) > -1;
    }
    return !doc.documentElement.contains(event.target as Node) || el.contains(event.target as Node);
}

export function ClickAwayListener(props: ClickAwayListenerProps) {
    const { children, disableReactTree = false, mouseEvent = "onClick", onClickAway } = props;

    const nodeRef = useRef<HTMLElement>(null);
    const activatedRef = useRef(false);
    const syntheticEventRef = useRef(false);
    const handleRef = useForkRef(
        // @ts-expect-error
        children.ref,
        nodeRef,
    );

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
            onClickAway?.(event);
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
        return;
    }, [handleClickAway, mouseEvent]);

    const childrenProps: any = { ref: handleRef };

    if (mouseEvent !== false) {
        // Keep track of mouse events that bubbled up through the portal
        childrenProps[mouseEvent] = (event: React.SyntheticEvent) => {
            syntheticEventRef.current = true;
            children.props[mouseEvent]?.(event);
        };
    }

    return <>{cloneElement(children, childrenProps)}</>;
}

if (process.env.NODE_ENV !== "production") {
    ClickAwayListener.displayName = "ClickAwayListener";
}

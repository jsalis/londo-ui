import { forwardRef, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { useCounter, useCallbackRef, useForkRef, useForkHandler } from "../hooks";
import { MoveHorizontalIcon } from "../icons";

import { Input } from "./input";

const FLOATING_POINT_REGEX = /^[Ee0-9+\-.]$/;

function sanitize(value) {
    return value
        .split("")
        .filter((char) => FLOATING_POINT_REGEX.test(char))
        .join("");
}

function isNumericKeyboardEvent(event) {
    if (!event.key || event.ctrlKey || event.altKey || event.metaKey || event.key.length !== 1) {
        return true;
    }

    return FLOATING_POINT_REGEX.test(event.key);
}

function getStepFactor(event) {
    if (event.metaKey || event.ctrlKey) {
        return 0.1;
    }

    if (event.shiftKey) {
        return 10;
    }

    return 1;
}

const StyledSuffix = styled(Input.Suffix)`
    visibility: visible;
`;

const DragHandle = styled(Input.Suffix)`
    color: ${(p) => (p.active ? p.theme.colors.primary.base : p.theme.colors.text)};
    visibility: hidden;
    pointer-events: auto;
    cursor: ew-resize;
`;

const StyledGroup = styled(Input.Group)`
    input:focus:enabled {
        padding-right: 4px;

        & ~ ${StyledSuffix} {
            display: none;
        }
    }

    &:hover input:enabled {
        &:focus {
            padding-right: 24px;
        }

        & ~ ${StyledSuffix} {
            visibility: hidden;
        }

        & ~ ${DragHandle} {
            visibility: visible;
        }
    }
`;

export const NumberInput = forwardRef((props, ref) => {
    const {
        className,
        suffix,
        min = Number.MIN_SAFE_INTEGER,
        max = Number.MAX_SAFE_INTEGER,
        step = 1,
        readOnly,
        disabled,
        onDragChange,
    } = props;

    const counter = useCounter(props);
    const dragger = useDragger({
        onDragChange,
        onUpdate(event) {
            const dx = event.movementX;

            if (dx !== 0) {
                counter.increment(dx * step);
            }
        },
    });

    const handleChange = (val) => {
        counter.update(sanitize(val));
    };

    const handleBlur = () => {
        counter.cast(counter.value);
    };

    const handleKeyDown = (event) => {
        if (!isNumericKeyboardEvent(event)) {
            event.preventDefault();
        }

        if (readOnly || disabled) {
            return;
        }

        const stepFactor = getStepFactor(event) * step;
        const keyMap = {
            ArrowUp: () => counter.increment(stepFactor),
            ArrowDown: () => counter.decrement(stepFactor),
            Home: () => counter.update(min),
            End: () => counter.update(max),
        };

        const action = keyMap[event.key];

        if (action) {
            event.preventDefault();
            action();
        }
    };

    const inputProps = {
        ref: useForkRef(ref, dragger.ref),
        onFocus: props.onFocus,
        onBlur: useForkHandler(props.onBlur, handleBlur),
        onKeyDown: useForkHandler(props.onKeyDown, handleKeyDown),
    };

    return (
        <StyledGroup className={className}>
            <Input
                value={counter.value}
                onChange={handleChange}
                readOnly={readOnly}
                disabled={disabled}
                {...inputProps}
            />
            <DragHandle active={dragger.active} onMouseDown={dragger.start}>
                <MoveHorizontalIcon />
            </DragHandle>
            {suffix && <StyledSuffix>{suffix}</StyledSuffix>}
        </StyledGroup>
    );
});

function useDragger({ onDragChange, onUpdate }) {
    const ref = useRef();
    const savedCallback = useCallbackRef(onUpdate);
    const [active, setActive] = useState(false);

    const start = () => {
        setActive(true);
        onDragChange?.(true);
    };

    useEffect(() => {
        if (active) {
            ref.current?.focus();
            ref.current?.requestPointerLock();

            const onRelease = () => {
                setActive(false);
                onDragChange?.(false);
            };

            const onPointerLockChange = () => {
                if (document.pointerLockElement === ref.current) {
                    document.addEventListener("mousemove", savedCallback, false);
                } else {
                    setActive(false);
                    onDragChange?.(false);
                }
            };

            document.addEventListener("mouseup", onRelease);
            document.addEventListener("pointerlockchange", onPointerLockChange, false);

            return () => {
                document.removeEventListener("mouseup", onRelease);
                document.removeEventListener("pointerlockchange", onPointerLockChange, false);
                document.removeEventListener("mousemove", savedCallback, false);
                document.exitPointerLock?.();
            };
        }
    }, [active]);

    return { ref, active, start };
}

NumberInput.propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onKeyDown: PropTypes.func,
    onDragChange: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
    precision: PropTypes.number,
    suffix: PropTypes.node,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

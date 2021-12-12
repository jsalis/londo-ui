import { forwardRef, cloneElement } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { system, space, layout, position, flexbox, color } from "styled-system";

import { getValidChildren } from "../utils/react-util";
import { useControllableState } from "../hooks";

import { Flex } from "./flex";

const other = system({
    textTransform: true,
    pointerEvents: true,
    cursor: true,
});

const StyledInput = styled.input`
    width: 100%;
    min-width: 0;
    height: 24px;
    padding: 0 4px;
    line-height: ${(p) => p.theme.lineHeights.base};
    outline: 0;
    position: relative;
    appearance: none;
    transition: all 0.2s, height 0ms;
    border: ${(p) => p.theme.borders.base};
    border-radius: ${(p) => p.theme.radii.base}px;
    background: ${(p) => p.theme.colors.gray[1]};
    ${space}
    ${layout}
    ${flexbox}
    ${color}
    ${other}

    &:hover:enabled {
        border-color: ${(p) => p.theme.colors.gray[5]};
    }

    &:focus:enabled {
        border-color: ${(p) => p.theme.colors.primary.hover};
        box-shadow: 0 0 0 1px ${(p) => p.theme.colors.primary.hover};
        z-index: 1;
    }

    &:read-only {
        user-select: all;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const InputElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    width: 24px;
    height: 24px;
    padding: 0 4px;
    color: ${(p) => p.theme.colors.alpha[5]};
    pointer-events: none;
    z-index: 2;
    ${space}
    ${layout}
    ${position}
    ${flexbox}
    ${color}
    ${other}
`;

const Group = forwardRef(({ children, ...rest }, ref) => {
    const groupStyles = {};
    const validChildren = getValidChildren(children);

    validChildren.forEach((child) => {
        if (child.type.id === "InputPrefix") {
            groupStyles.paddingLeft = 24;
        }

        if (child.type.id === "InputSuffix") {
            groupStyles.paddingRight = 24;
        }
    });

    const clones = validChildren.map((child) => {
        const { pl, pr } = child.props;
        return child.type.id === "Input"
            ? cloneElement(child, {
                  pl: pl ?? groupStyles?.paddingLeft,
                  pr: pr ?? groupStyles?.paddingRight,
              })
            : child;
    });

    return (
        <Flex ref={ref} position="relative" width={1} zIndex={0} {...rest}>
            {clones}
        </Flex>
    );
});

const Prefix = forwardRef((props, ref) => {
    return <InputElement ref={ref} left="0" {...props} />;
});

Prefix.id = "InputPrefix";

const Suffix = forwardRef((props, ref) => {
    return <InputElement ref={ref} right="0" {...props} />;
});

Suffix.id = "InputSuffix";

export const Input = forwardRef((props, ref) => {
    const { value, defaultValue, onChange, ...rest } = props;
    const [inputValue, setSelectedValue] = useControllableState(value, defaultValue);

    const handleSelect = (event) => {
        const val = event.target.value;
        setSelectedValue(val);
        onChange?.(val, event);
    };

    return <StyledInput ref={ref} value={inputValue} onChange={handleSelect} {...rest} />;
});

Input.id = "Input";
Input.Group = Group;
Input.Prefix = Prefix;
Input.Suffix = Suffix;

if (process.env.NODE_ENV !== "production") {
    Input.displayName = "Input";
    Input.propTypes = {
        type: PropTypes.string,
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        readOnly: PropTypes.bool,
        disabled: PropTypes.bool,
        className: PropTypes.string,
    };
}

Input.defaultProps = {
    type: "text",
};

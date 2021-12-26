import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { space, flexbox } from "styled-system";

import { useControllableState } from "../hooks";

import { Box } from "./box";

const Input = styled.input`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
    cursor: pointer;
`;

const Control = styled.span`
    display: inline-flex;
    position: relative;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    background: ${(p) => p.theme.colors.gray[1]};
    border: ${(p) => p.theme.borders.base};
    border-radius: ${(p) => p.theme.radii.base}px;
    transition: all 0.2s;

    &::after {
        position: absolute;
        top: 50%;
        left: 2px;
        display: table;
        width: 5px;
        height: 9px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(0) translate(-50%, -50%);
        opacity: 0;
        transition: all 0.2s ${(p) => p.theme.transitions.easeOutBack}, opacity 0.1s;
        content: " ";
    }
`;

const Label = styled.label`
    display: inline-flex;
    align-items: center;
    vertical-align: top;
    position: relative;
    cursor: pointer;
    ${space}
    ${flexbox}

    &:hover ${Control} {
        border-color: ${(p) => p.theme.colors.gray[5]};
    }

    ${Input}:focus + ${Control} {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }

    ${(p) =>
        p.checked &&
        css`
            ${Control} {
                background-color: ${p.theme.colors.primary.base};
                border-color: ${p.theme.colors.primary.base};

                &::after {
                    transform: rotate(45deg) scale(1) translate(-50%, -50%);
                    opacity: 1;
                }
            }

            &:hover ${Control} {
                background-color: ${p.theme.colors.primary.hover};
                border-color: ${p.theme.colors.primary.hover};
            }
        `}

    ${(p) =>
        p.disabled &&
        css`
            color: ${p.theme.colors.disabled};

            &,
            ${Input} {
                cursor: not-allowed;
            }

            ${Control} {
                opacity: ${p.checked ? 1 : 0.5};
                background: ${p.theme.colors.gray[p.checked ? 4 : 1]} !important;
                border-color: ${p.theme.colors.border.base} !important;

                &::after {
                    border-color: ${p.theme.colors.disabled};
                }
            }
        `}
`;

export const Checkbox = forwardRef((props, ref) => {
    const {
        checked: checkedProp,
        defaultChecked,
        onChange,
        direction,
        disabled,
        className,
        children,
        ...rest
    } = props;

    const [checked, setChecked] = useControllableState(checkedProp, defaultChecked);

    const handleChange = (event) => {
        const val = event.target.checked;
        setChecked(val);
        onChange?.(val, event);
    };

    return (
        <Label
            className={className}
            checked={checked}
            disabled={disabled}
            flexDirection={direction}
        >
            <Input
                ref={ref}
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={handleChange}
                {...rest}
            />
            <Control />
            {children && (
                <Box pl={direction === "row" ? 2 : 0} pt={direction === "column" ? 2 : 0}>
                    {children}
                </Box>
            )}
        </Label>
    );
});

if (process.env.NODE_ENV !== "production") {
    Checkbox.displayName = "Checkbox";
    Checkbox.propTypes = {
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool, PropTypes.string]),
        checked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        defaultChecked: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        direction: PropTypes.oneOf(["row", "column"]),
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        className: PropTypes.string,
        children: PropTypes.node,
    };
}

Checkbox.defaultProps = {
    defaultChecked: false,
    direction: "row",
};

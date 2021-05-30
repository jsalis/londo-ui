import { forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { space, flexbox } from "styled-system";

import { useControllableState } from "../../hooks";
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
    background: ${(props) => props.theme.colors.gray[1]};
    border: ${(props) => props.theme.borders.base};
    border-radius: ${(props) => props.theme.radii.base}px;
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
        transition: all 0.2s ${(props) => props.theme.transitions.easeOutBack},
            opacity 0.1s;
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

    &:hover ${Control}, ${Input}:focus + ${Control} {
        border-color: ${(props) => props.theme.colors.gray[5]};
    }

    ${(props) =>
        props.checked &&
        css`
            ${Control} {
                background-color: ${props.theme.colors.primary.base};
                border-color: ${props.theme.colors.primary.base};

                &::after {
                    transform: rotate(45deg) scale(1) translate(-50%, -50%);
                    opacity: 1;
                }
            }

            &:hover ${Control}, ${Input}:focus + ${Control} {
                background-color: ${props.theme.colors.primary.hover};
                border-color: ${props.theme.colors.primary.hover};
            }
        `}

    ${(props) =>
        props.disabled &&
        css`
            &,
            ${Input} {
                cursor: not-allowed;
            }

            ${Control} {
                opacity: ${props.checked ? 1 : 0.5};
                background: ${props.theme.colors.gray[props.checked ? 4 : 1]} !important;
                border-color: ${props.theme.colors.border.base} !important;

                &::after {
                    border-color: ${props.theme.colors.gray[1]};
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
        setChecked(event.target.checked);
        onChange?.(event);
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

Checkbox.propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
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

Checkbox.defaultProps = {
    defaultChecked: false,
    direction: "row",
};

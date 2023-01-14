import { forwardRef, createContext, useContext, useMemo } from "react";
import { space, flexbox } from "styled-system";
import styled from "styled-components";

import { useControllableState, useCallbackRef } from "../hooks";

import type { FlexProps } from "./flex";
import { Flex } from "./flex";
import { Box } from "./box";

interface RadioGroupContextValue {
    value?: string | number;
    onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    disabled?: boolean;
    isInvalid?: boolean;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    value: string | number;
    onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

export interface RadioGroupProps extends FlexProps {
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (value: string | number, event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    disabled?: boolean;
    isInvalid?: boolean;
}

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
    flex: none;
    position: relative;
    top: 0;
    left: 0;
    width: 14px;
    height: 14px;
    background: ${(p) => p.theme.colors.gray[1]};
    border: ${(p) => p.theme.borders.base};
    border-radius: 50%;
    transition: all 0.2s;

    &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        display: table;
        width: 14px;
        height: 14px;
        margin-top: -7px;
        margin-left: -7px;
        background-color: ${(p) => p.theme.colors.primary.base};
        border-top: 0;
        border-left: 0;
        border-radius: 14px;
        transform: scale(0);
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
    user-select: none;
    cursor: pointer;
    ${space}
    ${flexbox}

    &:hover ${Control} {
        border-color: ${(p) => p.theme.colors.gray[5]};
    }

    ${Input}:focus + ${Control} {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }

    &[data-state="checked"] {
        ${Control} {
            border-color: ${(p) => p.theme.colors.primary.base};

            &::after {
                transform: scale(0.5);
                opacity: 1;
            }
        }

        &:hover ${Control} {
            border-color: ${(p) => p.theme.colors.primary.hover};

            &::after {
                background-color: ${(p) => p.theme.colors.primary.hover};
            }
        }
    }

    &[data-disabled] {
        color: ${(p) => p.theme.colors.disabled};

        &,
        ${Input} {
            cursor: not-allowed;
        }

        ${Control} {
            opacity: 0.5;
            border-color: ${(p) => p.theme.colors.border.base} !important;

            &::after {
                background: ${(p) => p.theme.colors.disabled} !important;
            }
        }

        &[data-state="checked"] ${Control} {
            opacity: 1;
        }
    }

    &[data-invalid] {
        ${Control} {
            border-color: ${(p) => p.theme.colors.danger.base};

            &::after {
                background-color: ${(p) => p.theme.colors.danger.base};
            }
        }

        &:hover ${Control} {
            border-color: ${(p) => p.theme.colors.danger.hover};

            &::after {
                background-color: ${(p) => p.theme.colors.danger.hover};
            }
        }

        ${Input}:focus:enabled + ${Control} {
            border-color: ${(p) => p.theme.colors.danger.base};
            box-shadow: 0 0 0 2px ${(p) => p.theme.colors.danger.hover};
        }
    }
`;

const RadioGroupContext = createContext<RadioGroupContextValue | undefined>(undefined);

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
    const {
        value: valueProp,
        defaultValue = "",
        onChange,
        name,
        disabled,
        isInvalid,
        color,
        children,
        ...rest
    } = props;

    const [value, setValue] = useControllableState(valueProp, defaultValue);

    const handleChange = useCallbackRef(
        (val: string | number, event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(val);
            onChange?.(val, event);
        }
    );

    const group = useMemo(
        () => ({ value, onChange: handleChange, name, disabled, isInvalid }),
        [value, handleChange, name, disabled, isInvalid]
    );

    return (
        <RadioGroupContext.Provider value={group}>
            <Flex
                ref={ref}
                position="relative"
                gap={3}
                width={1}
                color={color as any}
                role="radiogroup"
                {...rest}
            >
                {children}
            </Flex>
        </RadioGroupContext.Provider>
    );
});

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
    const { value, onChange, disabled, className, children, ...rest } = props;
    const group = useContext(RadioGroupContext);
    const isChecked = group?.value === value;
    const isDisabled = group?.disabled || disabled;
    const isInvalid = group?.isInvalid;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        group?.onChange?.(value, event);
        onChange?.(value, event);
    };

    return (
        <Label
            className={className}
            data-state={isChecked ? "checked" : "unchecked"}
            data-disabled={isDisabled}
            data-invalid={isInvalid}
        >
            <Input
                ref={ref}
                type="radio"
                name={group?.name}
                value={value}
                disabled={isDisabled}
                onChange={handleChange}
                {...rest}
            />
            <Control />
            {children ? <Box pl={2}>{children}</Box> : null}
        </Label>
    );
});

const CompoundRadio = Object.assign(Radio, {
    id: "Radio",
    Group: RadioGroup,
});

export { CompoundRadio as Radio };

if (process.env.NODE_ENV !== "production") {
    Radio.displayName = "Radio";
    RadioGroup.displayName = "RadioGroup";
}

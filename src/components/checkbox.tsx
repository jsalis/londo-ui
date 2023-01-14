import { forwardRef, createContext, useContext, useMemo } from "react";
import styled from "styled-components";

import { useControllableState, useCallbackRef } from "../hooks";

import type { FlexProps } from "./flex";
import { Flex } from "./flex";
import { Box } from "./box";

interface CheckboxGroupContextValue {
    value: (string | number)[];
    onChange?: (checked: boolean, value: string | number) => void;
    name: string;
    disabled?: boolean;
    isInvalid?: boolean;
}

export interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    orientation?: "horizontal" | "vertical";
    value?: string | number;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

export interface CheckboxGroupProps extends FlexProps {
    value?: (string | number)[];
    defaultValue?: (string | number)[];
    onChange?: (value: (string | number)[]) => void;
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
    user-select: none;
    cursor: pointer;

    &:hover ${Control} {
        border-color: ${(p) => p.theme.colors.gray[5]};
    }

    ${Input}:focus + ${Control} {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
    }

    &[data-orientation="horizontal"] {
        flex-direction: row;
    }

    &[data-orientation="vertical"] {
        flex-direction: column;
    }

    &[data-state="checked"] {
        ${Control} {
            background: ${(p) => p.theme.colors.primary.base};
            border-color: ${(p) => p.theme.colors.primary.base};

            &::after {
                transform: rotate(45deg) scale(1) translate(-50%, -50%);
                opacity: 1;
            }
        }

        &:hover ${Control} {
            background: ${(p) => p.theme.colors.primary.hover};
            border-color: ${(p) => p.theme.colors.primary.hover};
        }
    }

    &[data-invalid] {
        ${Control} {
            border-color: ${(p) => p.theme.colors.danger.base};
        }

        &:hover ${Control} {
            border-color: ${(p) => p.theme.colors.danger.hover};
        }

        ${Input}:focus:enabled + ${Control} {
            box-shadow: 0 0 0 2px ${(p) => p.theme.colors.danger[2]};
        }

        &[data-state="checked"] {
            ${Control} {
                background: ${(p) => p.theme.colors.danger.base};
                border-color: ${(p) => p.theme.colors.danger.base};
            }

            &:hover ${Control} {
                background: ${(p) => p.theme.colors.danger.hover};
                border-color: ${(p) => p.theme.colors.danger.hover};
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
            background: ${(p) => p.theme.colors.gray[1]} !important;
            border-color: ${(p) => p.theme.colors.border.base} !important;

            &::after {
                border-color: ${(p) => p.theme.colors.disabled};
            }
        }

        &[data-state="checked"] ${Control} {
            opacity: 1;
            background: ${(p) => p.theme.colors.gray[4]} !important;
        }
    }
`;

const CheckboxGroupContext = createContext<CheckboxGroupContextValue | undefined>(undefined);

const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>((props, ref) => {
    const {
        value: valueProp,
        defaultValue = [],
        onChange,
        name,
        disabled,
        isInvalid,
        color,
        children,
        ...rest
    } = props;

    const [listValue, setListValue] = useControllableState(valueProp, defaultValue);

    const handleChange = useCallbackRef((checked: boolean, value: string | number) => {
        const val = checked ? [...listValue, value] : listValue.filter((v) => v !== value);
        setListValue(val);
        onChange?.(val);
    });

    const group = useMemo(
        () => ({ value: listValue, onChange: handleChange, name, disabled, isInvalid }),
        [listValue, handleChange, name, disabled, isInvalid]
    );

    return (
        <CheckboxGroupContext.Provider value={group}>
            <Flex ref={ref} position="relative" gap={3} width={1} color={color as any} {...rest}>
                {children}
            </Flex>
        </CheckboxGroupContext.Provider>
    );
});

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
    const {
        checked: checkedProp,
        defaultChecked = false,
        onChange,
        orientation = "horizontal",
        name,
        value = "",
        disabled,
        className,
        children,
        ...rest
    } = props;
    const group = useContext(CheckboxGroupContext);
    const inputName = group?.name ?? name;
    const isDisabled = group?.disabled || disabled;
    const isInvalid = group?.isInvalid;

    const [checked, setChecked] = useControllableState(
        group?.value.includes(value) ?? checkedProp,
        defaultChecked
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        setChecked(checked);
        group?.onChange?.(checked, value);
        onChange?.(checked, event);
    };

    return (
        <Label
            className={className}
            data-state={checked ? "checked" : "unchecked"}
            data-orientation={orientation}
            data-disabled={isDisabled}
            data-invalid={isInvalid}
        >
            <Input
                ref={ref}
                type="checkbox"
                name={inputName}
                value={value}
                checked={checked}
                disabled={isDisabled}
                onChange={handleChange}
                {...rest}
            />
            <Control />
            {children ? (
                <Box
                    pl={orientation === "horizontal" ? 2 : 0}
                    pt={orientation === "vertical" ? 2 : 0}
                >
                    {children}
                </Box>
            ) : null}
        </Label>
    );
});

const CompoundCheckbox = Object.assign(Checkbox, {
    id: "Checkbox",
    Group: CheckboxGroup,
});

export { CompoundCheckbox as Checkbox };

if (process.env.NODE_ENV !== "production") {
    Checkbox.displayName = "Checkbox";
    CheckboxGroup.displayName = "CheckboxGroup";
}

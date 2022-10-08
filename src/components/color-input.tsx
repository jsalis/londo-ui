import type * as CSS from "csstype";
import type { ResponsiveValue } from "styled-system";
import { forwardRef, useState } from "react";
import styled from "styled-components";

import { isNull } from "../utils/type-util";
import { isValidColorHex } from "../utils/color-util";
import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { EyeDropperIcon } from "../icons";
import { KeyCode } from "../utils/key-code";

import type { InputProps } from "./input";
import { Input } from "./input";
import { Dropdown } from "./dropdown";
import { ColorPicker } from "./color-picker";
import { ColorSwatch } from "./color-swatch";

export interface ColorInputProps extends InputProps {
    value?: string;
    defaultValue?: string;
    pickerSize?: ResponsiveValue<CSS.Property.Height>;
    pickerDisabled?: boolean;
    onChange?: (value: string) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

function escapeInput(val: string) {
    return val.replace(/([^0-9A-F]+)/gi, "").substr(0, 6);
}

function isEyeDropperSupported() {
    return "EyeDropper" in window;
}

function openEyeDropper(): Promise<{ sRGBHex: string }> {
    // @ts-ignore
    return new window.EyeDropper().open();
}

const StyledSuffix = styled(Input.Suffix)`
    color: ${(p) => p.theme.colors.text};
    pointer-events: auto;
    cursor: pointer;
`;

const StyledGroup = styled(Input.Group)`
    input:disabled ~ ${StyledSuffix} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const ColorInput = forwardRef<HTMLInputElement, ColorInputProps>(
    (
        {
            value,
            defaultValue = "#000000",
            onChange,
            onOpen,
            onClose,
            onBlur,
            onKeyDown,
            pickerSize,
            pickerDisabled,
            disabled,
            className,
            ...rest
        },
        ref
    ) => {
        const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
        const [color, setColor] = useControllableState(value, defaultValue);
        const [inputValue, setInputValue] = useState<string | null>(null);

        const handleInputChange = (val: string) => {
            const escVal = escapeInput(val);
            setInputValue(escVal);

            if (isValidColorHex(escVal)) {
                const hex = "#" + escVal;
                setColor(hex);
                onChange?.(hex);
            }
        };

        const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
            setInputValue(null);
            onBlur?.(event);
        };

        const handlePickerChange = (val: string) => {
            setColor(val);
            onChange?.(val);
        };

        const handleEyeDropper = (event: React.MouseEvent) => {
            event.preventDefault();

            if (!disabled) {
                openEyeDropper().then(({ sRGBHex: val }) => {
                    setColor(val);
                    onChange?.(val);
                });
            }
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === KeyCode.ENTER && !pickerDisabled) {
                open();
            } else if (event.key === KeyCode.ESC) {
                event.stopPropagation();
                close();
            }
        };

        const inputProps = {
            onKeyDown: useForkHandler(onKeyDown, handleKeyDown),
            disabled,
            ...rest,
        };

        const overlay = (
            <ColorPicker color={color} onChange={handlePickerChange} size={pickerSize} />
        );

        return (
            <Dropdown
                overlay={overlay}
                isOpen={isOpen}
                onOpen={open}
                onClose={close}
                disabled={pickerDisabled || disabled}
                keepMounted={false}
                matchWidth={false}
                p={2}
            >
                <StyledGroup className={className}>
                    <Input.Prefix>
                        <ColorSwatch color={color} size={14} />
                    </Input.Prefix>
                    <Input
                        ref={ref}
                        value={isNull(inputValue) ? color : "#" + inputValue}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        spellCheck="false"
                        textTransform="uppercase"
                        {...inputProps}
                    />
                    {isEyeDropperSupported() ? (
                        <StyledSuffix onClick={handleEyeDropper}>
                            <EyeDropperIcon />
                        </StyledSuffix>
                    ) : null}
                </StyledGroup>
            </Dropdown>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    ColorInput.displayName = "ColorInput";
}

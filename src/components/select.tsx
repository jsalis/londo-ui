import { forwardRef } from "react";
import styled, { css } from "styled-components";

import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { ChevronDownIcon } from "../icons";
import { KeyCode } from "../utils/key-code";

import type { InputProps } from "./input";
import { Input } from "./input";
import { Dropdown } from "./dropdown";
import { ScrollBox } from "./scroll-box";
import { Flex } from "./flex";

type SelectOption = {
    value: any;
    label: string;
    children?: React.ReactNode;
};

interface OptionProps {
    selected?: boolean;
}

export interface SelectProps extends InputProps {
    options?: SelectOption[];
    maxScrollHeight?: number;
    renderOverlay?: (items: React.ReactNode) => React.ReactNode;
    onChange?: (value: any) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

const Option = styled.div<OptionProps>`
    padding: 4px;
    flex: auto;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;

    &:hover,
    &:active {
        color: ${(p) => p.theme.colors.gray[9]};
        background: ${(p) => p.theme.colors.alpha[1]};
    }

    ${(p) =>
        p.selected &&
        css`
            &,
            &:hover {
                color: ${p.theme.colors.primary.base};
                background: ${p.theme.colors.gray[1]};
            }
        `}
`;

export const Select = forwardRef<HTMLInputElement, SelectProps>(
    (
        {
            options = [],
            value,
            defaultValue,
            onChange,
            onOpen,
            onClose,
            onBlur,
            onKeyDown,
            disabled,
            maxScrollHeight = 256,
            renderOverlay,
            className,
            ...rest
        },
        ref
    ) => {
        const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
        const [selectedValue, setSelectedValue] = useControllableState(value, defaultValue);
        const selectedOption = options.find((opt) => opt.value === selectedValue);

        const handleBlur = () => {
            close();
        };

        const handleKeyDown = (event: React.KeyboardEvent) => {
            if (event.key === KeyCode.ENTER) {
                open();
            } else if (event.key === KeyCode.ESC) {
                event.stopPropagation();
                close();
            }
        };

        const handleSelect = (val: any) => {
            setSelectedValue(val);
            onChange?.(val);
            close();
        };

        const inputProps = {
            onBlur: useForkHandler(onBlur, handleBlur),
            onKeyDown: useForkHandler(onKeyDown, handleKeyDown),
            disabled,
            ...rest,
        };

        const overlayItems = (
            <ScrollBox maxHeight={maxScrollHeight}>
                {options.length > 0 ? (
                    options.map((opt) => (
                        <Option
                            key={opt.value}
                            onClick={() => handleSelect(opt.value)}
                            selected={selectedOption?.value === opt.value}
                        >
                            {opt.children ?? opt.label}
                        </Option>
                    ))
                ) : (
                    <Flex p={1} align="center" justify="center" color="placeholder">
                        No Data
                    </Flex>
                )}
            </ScrollBox>
        );

        const overlay = renderOverlay?.(overlayItems) ?? overlayItems;

        return (
            <Dropdown
                overlay={overlay}
                isOpen={isOpen}
                onOpen={open}
                onClose={close}
                disabled={disabled}
            >
                <Input.Group className={className}>
                    <Input
                        ref={ref}
                        value={selectedOption?.label ?? ""}
                        role="combobox"
                        cursor="pointer"
                        readOnly
                        {...inputProps}
                    />
                    <Input.Suffix>
                        <ChevronDownIcon />
                    </Input.Suffix>
                </Input.Group>
            </Dropdown>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Select.displayName = "Select";
}

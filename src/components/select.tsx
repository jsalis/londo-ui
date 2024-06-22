import { forwardRef } from "react";
import styled, { css } from "styled-components";

import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { ChevronDownIcon, CloseIcon } from "../icons";
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
    suffixIcon?: React.ReactNode;
    clearIcon?: React.ReactNode;
    allowClear?: boolean;
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

const SelectArrow = styled.span`
    display: contents;
`;

const SelectClear = styled.span`
    color: ${(p) => p.theme.colors.text};
    display: none;
`;

const StyledSuffix = styled(Input.Suffix)`
    pointer-events: none;
`;

const StyledGroup = styled(Input.Group)`
    &[data-allow-clear="true"] {
        input:enabled ~ ${StyledSuffix} {
            pointer-events: auto;
            cursor: pointer;
        }

        &:hover {
            input:enabled ~ ${StyledSuffix} {
                ${SelectClear} {
                    display: contents;
                }

                ${SelectArrow} {
                    display: none;
                }
            }
        }
    }
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
            suffixIcon,
            clearIcon,
            allowClear = false,
            maxScrollHeight = 256,
            renderOverlay,
            className,
            ...rest
        },
        ref,
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

        const handleClear = (event: React.MouseEvent) => {
            if (allowClear) {
                event.preventDefault();
                event.stopPropagation();
                handleSelect("");
            }
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
                <StyledGroup className={className} data-allow-clear={allowClear && !!selectedValue}>
                    <Input
                        ref={ref}
                        value={selectedOption?.label ?? selectedValue ?? ""}
                        role="combobox"
                        cursor="pointer"
                        readOnly
                        {...inputProps}
                    />
                    <StyledSuffix onClick={handleClear} aria-hidden>
                        <SelectArrow>{suffixIcon ?? <ChevronDownIcon />}</SelectArrow>
                        <SelectClear>{clearIcon ?? <CloseIcon />}</SelectClear>
                    </StyledSuffix>
                </StyledGroup>
            </Dropdown>
        );
    },
);

if (process.env.NODE_ENV !== "production") {
    Select.displayName = "Select";
}

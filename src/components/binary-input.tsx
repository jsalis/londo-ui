import { forwardRef } from "react";

import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { ChevronDownIcon } from "../icons";
import { KeyCode } from "../utils/key-code";

import type { InputProps } from "./input";
import { Input } from "./input";
import { Grid } from "./grid";
import { Flex } from "./flex";
import { Checkbox } from "./checkbox";
import { Dropdown } from "./dropdown";

export interface BinaryInputProps extends Omit<InputProps, "onChange"> {
    value?: number;
    defaultValue?: number;
    bits?: number;
    max?: number;
    onChange?: (value: number) => void;
    onOpen?: () => void;
    onClose?: () => void;
}

function getBit(i: number, num: number) {
    return num & (1 << i);
}

function setBit(i: number, num: number, val: boolean) {
    return num ^ ((-val ^ num) & (1 << i));
}

export const BinaryInput = forwardRef<HTMLInputElement, BinaryInputProps>(
    (
        {
            value,
            defaultValue = 0,
            onChange,
            onOpen,
            onClose,
            onBlur,
            onKeyDown,
            bits = 16,
            max = 16,
            disabled,
            className,
            ...rest
        },
        ref,
    ) => {
        const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
        const [decimal, setDecimal] = useControllableState(value, defaultValue);

        const bitArray = [...Array(bits).keys()];
        const activeBits = bitArray.filter((i) => getBit(i, decimal) !== 0).map((i) => i + 1);

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

        const handleSelect = (i: number, val: boolean) => {
            const next = setBit(i, decimal, val);
            setDecimal(next);
            onChange?.(next);
        };

        const inputProps = {
            onBlur: useForkHandler(onBlur, handleBlur),
            onKeyDown: useForkHandler(onKeyDown, handleKeyDown),
            disabled,
            ...rest,
        };

        const overlay = (
            <Grid columns={4} gap={1}>
                {bitArray.map((i: number) => {
                    const checked = getBit(i, decimal) !== 0;
                    return (
                        <Flex key={i} p={1} justify="center">
                            <Checkbox
                                checked={checked}
                                onChange={(val) => handleSelect(i, val)}
                                disabled={activeBits.length >= max && !checked}
                                orientation="vertical"
                            >
                                {i + 1}
                            </Checkbox>
                        </Flex>
                    );
                })}
            </Grid>
        );

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
                        value={activeBits.join()}
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
    },
);

if (process.env.NODE_ENV !== "production") {
    BinaryInput.displayName = "BinaryInput";
}

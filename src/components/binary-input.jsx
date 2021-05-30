import { forwardRef } from "react";
import PropTypes from "prop-types";

import { useDisclosure, useControllableState, useForkHandler } from "../hooks";
import { ChevronDownIcon } from "../icons";

import { Grid } from "./grid";
import { Flex } from "./flex";
import { Input } from "./input";
import { Checkbox } from "./checkbox";
import { Dropdown } from "./dropdown";

function getBit(i, num) {
    return num & (1 << i);
}

function setBit(i, num, val) {
    return num ^ ((-val ^ num) & (1 << i));
}

export const BinaryInput = forwardRef((props, ref) => {
    const {
        value,
        defaultValue,
        onChange,
        onOpen,
        onClose,
        onBlur,
        bits,
        max,
        disabled,
        className,
        ...rest
    } = props;

    const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
    const [decimal, setDecimal] = useControllableState(value, defaultValue);

    const bitArray = [...Array(bits).keys()];
    const activeBits = bitArray.filter((i) => getBit(i, decimal) !== 0).map((i) => i + 1);

    const inputProps = {
        onBlur: useForkHandler(onBlur, close),
        disabled,
        ...rest,
    };

    const handleSelect = (i, val) => {
        const next = setBit(i, decimal, val);
        setDecimal(next);
        onChange?.(next);
    };

    const overlay = (
        <Grid columns={4} gap={1}>
            {bitArray.map((i) => {
                const checked = getBit(i, decimal) !== 0;
                return (
                    <Flex key={i} p={1} justifyContent="center">
                        <Checkbox
                            checked={checked}
                            onChange={(e) => handleSelect(i, e.target.checked)}
                            disabled={activeBits.length >= max && !checked}
                            direction="column"
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
});

BinaryInput.propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    bits: PropTypes.oneOf([...Array(16).keys()].map((i) => i + 1)),
    max: PropTypes.number,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

BinaryInput.defaultProps = {
    bits: 16,
    max: 16,
};

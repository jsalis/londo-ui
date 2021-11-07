import { forwardRef, useState } from "react";
import PropTypes from "prop-types";

import { isNull } from "../utils/type-util";
import { isValidColorHex } from "../utils/color-util";
import { useDisclosure, useControllableState } from "../hooks";
import { ColorIcon } from "../icons";

import { ColorPicker } from "./color-picker";
import { ColorSwatch } from "./color-swatch";
import { Input } from "./input";
import { Dropdown } from "./dropdown";

function escapeInput(val) {
    return val.replace(/([^0-9A-F]+)/gi, "").substr(0, 6);
}

export const ColorInput = forwardRef((props, ref) => {
    const {
        value,
        defaultValue,
        onChange,
        onOpen,
        onClose,
        onBlur,
        pickerSize,
        showEyeDropper,
        disabled,
        className,
        ...rest
    } = props;

    const { isOpen, open, close } = useDisclosure({ onOpen, onClose });
    const [color, setColor] = useControllableState(value, defaultValue);
    const [inputValue, setInputValue] = useState(null);

    const inputProps = {
        disabled,
        ...rest,
    };

    const handleInputChange = (event) => {
        const val = escapeInput(event.target.value);
        setInputValue(val);

        if (isValidColorHex(val)) {
            const hex = "#" + val;
            setColor(hex);
            onChange?.(hex);
        }
    };

    const handleInputBlur = (event) => {
        setInputValue(null);
        onBlur?.(event);
    };

    const handlePickerChange = (val) => {
        setColor(val);
        onChange?.(val);
    };

    const overlay = (
        <ColorPicker
            color={color}
            onChange={handlePickerChange}
            size={pickerSize}
            showEyeDropper={showEyeDropper}
        />
    );

    return (
        <Dropdown
            overlay={overlay}
            isOpen={isOpen}
            onOpen={open}
            onClose={close}
            disabled={disabled}
            sameWidth={false}
            p={2}
        >
            <Input.Group className={className}>
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
                <Input.Suffix>
                    <ColorIcon />
                </Input.Suffix>
            </Input.Group>
        </Dropdown>
    );
});

ColorInput.propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
    pickerSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    showEyeDropper: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

ColorInput.defaultProps = {
    defaultValue: "#000000",
    showEyeDropper: true,
};

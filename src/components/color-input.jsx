import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { isNull } from "../utils/type-util";
import { isValidColorHex } from "../utils/color-util";
import { useDisclosure, useControllableState } from "../hooks";
import { EyeDropperIcon } from "../icons";

import { ColorPicker } from "./color-picker";
import { ColorSwatch } from "./color-swatch";
import { Input } from "./input";
import { Dropdown } from "./dropdown";

function escapeInput(val) {
    return val.replace(/([^0-9A-F]+)/gi, "").substr(0, 6);
}

function isEyeDropperSupported() {
    return "EyeDropper" in window;
}

function openEyeDropper() {
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

export const ColorInput = forwardRef((props, ref) => {
    const {
        value,
        defaultValue,
        onChange,
        onOpen,
        onClose,
        onBlur,
        pickerSize,
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

    const handleEyeDropper = (event) => {
        event.preventDefault();

        if (!disabled) {
            openEyeDropper().then(({ sRGBHex: val }) => {
                setColor(val);
                onChange?.(val);
            });
        }
    };

    const overlay = <ColorPicker color={color} onChange={handlePickerChange} size={pickerSize} />;

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
                {isEyeDropperSupported() && (
                    <StyledSuffix onClick={handleEyeDropper}>
                        <EyeDropperIcon />
                    </StyledSuffix>
                )}
            </StyledGroup>
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
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

ColorInput.defaultProps = {
    defaultValue: "#000000",
};

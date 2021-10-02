import { forwardRef, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { EyeOnIcon, EyeOffIcon } from "../icons";

import { Input } from "./input";

const StyledSuffix = styled(Input.Suffix)`
    color: ${(p) => p.theme.colors.text};
    pointer-events: auto;
    cursor: pointer;
`;

const Container = styled(Input.Group)`
    input:disabled ~ ${StyledSuffix} {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const PasswordInput = forwardRef((props, ref) => {
    const { className, disabled, ...rest } = props;

    const [visible, setVisible] = useState(false);

    const type = visible ? "text" : "password";
    const suffix = visible ? <EyeOnIcon /> : <EyeOffIcon />;

    const handleVisibleChange = () => {
        if (!disabled) {
            setVisible(!visible);
        }
    };

    const handleMouseDown = (event) => {
        event.preventDefault();
    };

    return (
        <Container className={className}>
            <Input ref={ref} {...rest} type={type} disabled={disabled} />
            <StyledSuffix onClick={handleVisibleChange} onMouseDown={handleMouseDown}>
                {suffix}
            </StyledSuffix>
        </Container>
    );
});

PasswordInput.propTypes = {
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    readOnly: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
};

import { forwardRef, useState } from "react";
import styled from "styled-components";

import { EyeOnIcon, EyeOffIcon } from "../icons";

import type { InputProps } from "./input";
import { Input } from "./input";

export interface PasswordInputProps extends InputProps {}

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

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
    ({ className, disabled, ...rest }, ref) => {
        const [visible, setVisible] = useState(false);

        const type = visible ? "text" : "password";
        const suffix = visible ? <EyeOnIcon /> : <EyeOffIcon />;

        const handleVisibleChange = () => {
            if (!disabled) {
                setVisible(!visible);
            }
        };

        return (
            <StyledGroup className={className}>
                <Input ref={ref} {...rest} type={type} disabled={disabled} />
                <StyledSuffix onClick={handleVisibleChange} onMouseDown={(e) => e.preventDefault()}>
                    {suffix}
                </StyledSuffix>
            </StyledGroup>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    PasswordInput.displayName = "PasswordInput";
}

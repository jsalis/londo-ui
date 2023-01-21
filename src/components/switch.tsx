import type { MarginProps } from "styled-system";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { margin } from "styled-system";
import styled from "styled-components";

import { Flex } from "./flex";
import { Spinner } from "./spinner";

type SwitchPrimitiveProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

export interface SwitchProps
    extends Omit<SwitchPrimitiveProps, "onChange" | "onCheckedChange">,
        MarginProps {
    onChange?: (checked: boolean) => void;
    checkedContent?: React.ReactNode;
    uncheckedContent?: React.ReactNode;
    size?: "sm" | "md";
    isLoading?: boolean;
}

const SwitchSpinner = styled(Spinner)`
    position: relative;
    vertical-align: top;
    top: var(--thumb-margin);
    left: var(--thumb-margin);
    color: ${(p) => p.theme.colors.alpha.black[5]};
    width: 14px;
    height: 14px;
`;

const SwitchThumb = styled(SwitchPrimitive.Thumb)`
    position: absolute;
    top: var(--thumb-margin);
    left: var(--thumb-margin);
    width: var(--thumb-size);
    height: var(--thumb-size);
    transition: all 0.2s ease-in-out;
    will-change: left;

    &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: #fff;
        border-radius: 100px;
        box-shadow: 0 2px 4px 0 ${(p) => p.theme.colors.shadow.base};
        transition: all 0.2s ease-in-out;
        content: "";
    }
`;

const SwitchContent = styled.span`
    display: block;
    font-size: ${(p) => p.theme.fontSizes.sm}px;
    line-height: 1;
    color: #fff;
    margin: 0 7px 0 25px;
    transition: margin 0.2s;
`;

const SwitchRoot = styled(SwitchPrimitive.Root)<SwitchProps>`
    --thumb-size: 18px;
    --thumb-margin: 2px;
    all: unset;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: middle;
    border: 0;
    border-radius: 100px;
    min-width: 44px;
    height: 22px;
    line-height: 22px;
    background: ${(p) => p.theme.colors.disabled};
    transition: all 0.2s;
    user-select: none;
    cursor: pointer;
    ${margin}

    &:not([data-disabled]):hover {
        background: ${(p) => p.theme.colors.alpha[3]};
    }

    &:focus {
        box-shadow: 0 0 0 2px ${(p) => p.theme.colors.primary[2]};
        outline: 0;
    }

    &[data-size="sm"] {
        --thumb-size: 12px;
        min-width: 28px;
        height: 16px;
        line-height: 16px;

        ${SwitchSpinner} {
            width: 8px;
            height: 8px;
        }

        ${SwitchContent} {
            margin: 0 5px 0 18px;
        }

        &[data-state="checked"] {
            ${SwitchContent} {
                margin: 0 18px 0 5px;
            }
        }
    }

    &[data-state="unchecked"] div[data-checked-content] {
        display: none;
    }

    &[data-state="checked"] div[data-unchecked-content] {
        display: none;
    }

    &[data-state="checked"] {
        background: ${(p) => p.theme.colors.primary.base};

        &:not([data-disabled]):hover {
            background: ${(p) => p.theme.colors.primary.hover};
        }

        ${SwitchThumb} {
            left: calc(100% - var(--thumb-size) - var(--thumb-margin));
        }

        ${SwitchSpinner} {
            color: ${(p) => p.theme.colors.primary.base};
        }

        ${SwitchContent} {
            margin: 0 25px 0 7px;
        }
    }

    &:not([data-disabled]):active {
        ${SwitchThumb}::before {
            right: -30%;
            left: 0;
        }

        &[data-state="checked"] {
            ${SwitchThumb}::before {
                right: 0;
                left: -30%;
            }
        }
    }

    &[data-disabled] {
        opacity: 0.4;
        cursor: not-allowed;

        * {
            box-shadow: none;
            cursor: not-allowed;
        }
    }
`;

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
    (
        { size = "md", disabled, isLoading, onChange, checkedContent, uncheckedContent, ...rest },
        ref
    ) => {
        return (
            <SwitchRoot
                ref={ref}
                {...rest}
                disabled={disabled || isLoading}
                onCheckedChange={onChange}
                data-size={size}
            >
                <SwitchThumb>{isLoading ? <SwitchSpinner /> : null}</SwitchThumb>
                <SwitchContent>
                    <Flex data-checked-content>{checkedContent}</Flex>
                    <Flex data-unchecked-content>{uncheckedContent}</Flex>
                </SwitchContent>
            </SwitchRoot>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    Switch.displayName = "Switch";
}

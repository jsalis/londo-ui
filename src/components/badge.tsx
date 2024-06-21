import type { TextColorProps, BackgroundColorProps } from "styled-system";
import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { color } from "styled-system";
import styled from "styled-components";

import { isNumber } from "../utils/type-util";

export interface BadgeProps
    extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
        TextColorProps,
        BackgroundColorProps {
    count?: number;
    overflowCount?: number;
    dot?: boolean;
    size?: "sm" | "md";
    offset?: [number, number];
}

const BadgeCount = styled.sup<BadgeProps>`
    --badge-height: 20px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    box-shadow: 0 0 0 1px ${(p) => p.theme.colors.bg.base};
    background: ${(p) => p.theme.colors.primary.base};
    color: #fff;
    z-index: auto;

    &[data-dot="true"] {
        width: 8px;
        height: 8px;
        border-radius: 100%;
    }

    &[data-dot="false"] {
        padding: 0 6px;
        border-radius: calc(var(--badge-height) / 2);
        min-width: var(--badge-height);
        height: var(--badge-height);
        line-height: var(--badge-height);
        font-size: ${(p) => p.theme.fontSizes.sm}px;
        font-weight: normal;
        white-space: nowrap;
        text-align: center;
    }

    &[data-size="sm"] {
        --badge-height: 15px;
        padding: 0px 4px;
        font-size: 10px;
    }

    ${color}
`;

const BadgeMotion = styled(motion.div)`
    &[data-wrapper="true"] {
        position: absolute;
        top: 0;
        right: 0;
        transform-origin: 100% 0;
    }

    &[data-wrapper="false"] ${BadgeCount} {
        transform: none;
        position: relative;
        top: auto;
        display: block;
    }
`;

const BadgeRoot = styled.span`
    position: relative;
    display: inline-block;
    color: unset;
    line-height: 1;
`;

function stringifyCount(count?: number, overflowCount: number = 0) {
    if (!isNumber(count)) {
        return "";
    }
    if (count > overflowCount) {
        return `${overflowCount}+`;
    }
    return String(count);
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            count,
            overflowCount = 99,
            dot = false,
            size = "md",
            offset,
            color,
            bg,
            children,
            ...rest
        },
        ref,
    ) => {
        const countString = stringifyCount(count, overflowCount);
        const countDisplay = dot ? "" : countString;
        const title = isNumber(count) ? String(count) : undefined;
        const show = dot || (countString.length > 0 && countString !== "0");
        const offsetStyle = offset ? { right: -offset[0], top: offset[1] } : {};

        return (
            <BadgeRoot ref={ref} {...rest}>
                {children}
                <AnimatePresence>
                    {show ? (
                        <BadgeMotion
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            data-wrapper={!!children}
                        >
                            <BadgeCount
                                color={color as any}
                                bg={bg}
                                title={title}
                                data-size={size}
                                data-dot={dot}
                                style={offsetStyle}
                            >
                                {countDisplay}
                            </BadgeCount>
                        </BadgeMotion>
                    ) : null}
                </AnimatePresence>
            </BadgeRoot>
        );
    },
);

if (process.env.NODE_ENV !== "production") {
    Badge.displayName = "Badge";
}

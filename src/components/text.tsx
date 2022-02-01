import type * as CSS from "csstype";
import type {
    TypographyProps,
    SpaceProps,
    LayoutProps,
    FlexboxProps,
    ColorProps,
    ResponsiveValue,
} from "styled-system";
import { forwardRef, createElement } from "react";
import { system, typography, space, layout, flexbox, color } from "styled-system";
import styled, { css } from "styled-components";

export interface TextProps
    extends TypographyProps,
        SpaceProps,
        LayoutProps,
        FlexboxProps,
        ColorProps {
    as?: keyof JSX.IntrinsicElements;
    ellipsis?: boolean;
    disabled?: boolean;
    strong?: boolean;
    underline?: boolean;
    italic?: boolean;
    delete?: boolean;
    code?: boolean;
    keyboard?: boolean;
    textTransform?: ResponsiveValue<CSS.Property.TextTransform>;
    overflowWrap?: ResponsiveValue<CSS.Property.OverflowWrap>;
    whiteSpace?: ResponsiveValue<CSS.Property.WhiteSpace>;
    children?: React.ReactNode;
}

const other = system({
    textTransform: true,
    overflowWrap: true,
    whiteSpace: true,
});

const StyledText = styled.span<TextProps>`
    transition: color 0.3s;
    ${typography}
    ${space}
	${layout}
	${flexbox}
	${color}
	${other}

	${(p) =>
        p.ellipsis &&
        css`
            color: ${p.theme.colors.disabled};
            cursor: not-allowed;
            user-select: none;
        `}

	${(p) =>
        p.ellipsis &&
        css`
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            span& {
                display: inline-block;
            }
        `}

	code {
        margin: 0 0.2em;
        padding: 0.1em 0.4em;
        font-size: 85%;
        background: ${(p) => p.theme.colors.alpha[1]};
        border: 1px solid ${(p) => p.theme.colors.alpha[1]};
        border-radius: 3px;
    }

    kbd {
        margin: 0 0.2em;
        padding: 0.1em 0.4em;
        font-size: 90%;
        background: ${(p) => p.theme.colors.gray[1]};
        box-shadow: 0 2px 0 ${(p) => p.theme.colors.gray[4]};
        border: 1px solid ${(p) => p.theme.colors.gray[4]};
        border-radius: 3px;
    }
`;

const wrapperTags = Object.entries({
    strong: "strong",
    underline: "u",
    italic: "i",
    delete: "del",
    code: "code",
    keyboard: "kbd",
});

function composeWrappers(props: TextProps, children: React.ReactNode) {
    return wrapperTags.reduce((el, [key, tag]) => {
        return props[key as keyof TextProps] ? createElement(tag, {}, el) : el;
    }, children);
}

export const Text = forwardRef<HTMLElement, TextProps>(({ children, color, ...rest }, ref) => (
    <StyledText ref={ref} color={color as any} {...rest}>
        {composeWrappers(rest, children)}
    </StyledText>
));

if (process.env.NODE_ENV !== "production") {
    Text.displayName = "Text";
}

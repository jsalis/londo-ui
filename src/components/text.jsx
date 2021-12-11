import { createElement, forwardRef } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { system, typography, space, layout, flexbox, color } from "styled-system";

const other = system({
    textTransform: true,
    overflowWrap: true,
    whiteSpace: true,
});

const StyledText = styled.span`
    transition: color 0.3s;
    ${typography}
    ${space}
	${layout}
	${flexbox}
	${color}
	${other}
	
	${(p) =>
        p.disabled &&
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

function composeWrappers(props, children) {
    return wrapperTags.reduce((el, [key, tag]) => {
        return props[key] ? createElement(tag, {}, el) : el;
    }, children);
}

export const Text = forwardRef(({ children, ...rest }, ref) => {
    return (
        <StyledText ref={ref} {...rest}>
            {composeWrappers(rest, children)}
        </StyledText>
    );
});

if (process.env.NODE_ENV !== "production") {
    Text.propTypes = {
        ellipsis: PropTypes.bool,
        disabled: PropTypes.bool,
        strong: PropTypes.bool,
        underline: PropTypes.bool,
        italic: PropTypes.bool,
        delete: PropTypes.bool,
        code: PropTypes.bool,
        keyboard: PropTypes.bool,
        children: PropTypes.node,
    };
}

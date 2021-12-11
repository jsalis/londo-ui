import { css } from "styled-components";

export const reset = css`
    html,
    body {
        width: 100%;
        height: 100%;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    ::selection {
        color: #fff;
        background: ${(props) => props.theme.colors.primary.base};
    }

    html {
        font-family: sans-serif;
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
        -ms-overflow-style: scrollbar;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    body {
        margin: 0;
        color: ${(props) => props.theme.colors.text};
        font-family: ${(props) => props.theme.fonts.body};
        font-size: ${(props) => props.theme.fontSizes.sm}px;
        line-height: ${(props) => props.theme.lineHeights.none};
        font-variant: tabular-nums;
        font-feature-settings: "tnum";
    }

    body {
        background: ${(props) => props.theme.colors.bg.body};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
        color: ${(props) => props.theme.colors.heading};
        font-weight: 600;
    }

    p {
        margin-top: 0;
        margin-bottom: 1em;
        line-height: ${(props) => props.theme.lineHeights.base};
    }

    hr {
        box-sizing: content-box;
        height: 0;
        overflow: visible;
    }

    a {
        color: ${(props) => props.theme.colors.primary.base};
        background-color: transparent;
        text-decoration: none;
        outline: none;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: ${(props) => props.theme.colors.primary.hover};
        }

        &:active {
            color: ${(props) => props.theme.colors.primary.active};
        }

        &:active,
        &:hover {
            text-decoration: none;
            outline: 0;
        }

        &[disabled] {
            color: ${(props) => props.theme.colors.disabled};
            cursor: not-allowed;
            pointer-events: none;
        }
    }

    abbr[title],
    abbr[data-original-title] {
        text-decoration: underline dotted;
        border-bottom: 0;
        cursor: help;
    }

    address {
        margin-bottom: 1em;
        font-style: normal;
        line-height: inherit;
    }

    input[type="text"],
    input[type="password"],
    input[type="number"],
    textarea {
        -webkit-appearance: none;
    }

    ol,
    ul,
    dl {
        margin-top: 0;
        margin-bottom: 1em;
    }

    ol ol,
    ul ul,
    ol ul,
    ul ol {
        margin-bottom: 0;
    }

    dt {
        font-weight: 500;
    }

    dd {
        margin-bottom: 0.5em;
        margin-left: 0;
    }

    blockquote {
        margin: 0 0 1em;
    }

    dfn {
        font-style: italic;
    }

    b,
    strong {
        font-weight: bolder;
    }

    small {
        font-size: 80%;
    }

    sub,
    sup {
        position: relative;
        font-size: 75%;
        line-height: 0;
        vertical-align: baseline;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    pre,
    code,
    kbd,
    samp {
        font-size: 1em;
    }

    pre {
        margin-top: 0;
        margin-bottom: 1em;
        overflow: auto;
    }

    img {
        vertical-align: middle;
        border-style: none;
    }

    svg:not(:root) {
        overflow: hidden;
    }

    table {
        border-collapse: collapse;
    }

    th {
        text-align: inherit;
    }

    input,
    button,
    select,
    optgroup,
    textarea {
        margin: 0;
        color: inherit;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
    }

    textarea {
        overflow: auto;
        resize: vertical;
    }

    button,
    input {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    button,
    html [type="button"],
    [type="reset"],
    [type="submit"] {
        -webkit-appearance: button;
    }

    button::-moz-focus-inner,
    [type="button"]::-moz-focus-inner,
    [type="reset"]::-moz-focus-inner,
    [type="submit"]::-moz-focus-inner {
        padding: 0;
        border-style: none;
    }

    input[type="radio"],
    input[type="checkbox"] {
        box-sizing: border-box;
        padding: 0;
    }

    input[type="date"],
    input[type="time"],
    input[type="datetime-local"],
    input[type="month"] {
        -webkit-appearance: listbox;
    }

    [type="number"]::-webkit-inner-spin-button,
    [type="number"]::-webkit-outer-spin-button {
        height: auto;
    }

    [type="search"] {
        outline-offset: -2px;
        -webkit-appearance: none;
    }

    [type="search"]::-webkit-search-cancel-button,
    [type="search"]::-webkit-search-decoration {
        -webkit-appearance: none;
    }

    ::-webkit-file-upload-button {
        font: inherit;
        -webkit-appearance: button;
    }
`;

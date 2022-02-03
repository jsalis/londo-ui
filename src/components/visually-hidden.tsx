import styled from "styled-components";

export interface VisuallyHiddenProps {
    children: React.ReactNode;
}

export const VisuallyHidden = styled.span<VisuallyHiddenProps>`
    border: 0;
    clip: rect(0 0 0 0);
    height: 1px;
    width: 1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    word-wrap: normal;
`;

if (process.env.NODE_ENV !== "production") {
    VisuallyHidden.displayName = "VisuallyHidden";
}

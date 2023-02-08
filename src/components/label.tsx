import styled from "styled-components";

import type { BoxProps } from "./box";
import { Box } from "./box";

export interface LabelProps
    extends Omit<React.LabelHTMLAttributes<HTMLLabelElement>, "color">,
        BoxProps {}

export const Label = styled(Box)<LabelProps>`
    display: inline-block;
`;

if (process.env.NODE_ENV !== "production") {
    Label.displayName = "Label";
}

Label.defaultProps = {
    as: "label",
};

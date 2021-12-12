import styled from "styled-components";

import { Box } from "./box";

export const Label = styled(Box)`
    display: inline-block;
`;

if (process.env.NODE_ENV !== "production") {
    Label.displayName = "Label";
}

Label.defaultProps = {
    as: "label",
};

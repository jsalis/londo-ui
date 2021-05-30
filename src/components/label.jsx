import styled from "styled-components";

import { Box } from "./box";

export const Label = styled(Box)`
    display: inline-block;
`;

Label.defaultProps = {
    as: "label",
};

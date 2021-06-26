import styled from "styled-components";

import { Box } from "./box";

export const Flex = styled(Box)`
    display: ${(p) => (p.inline ? "inline-flex" : "flex")};
`;

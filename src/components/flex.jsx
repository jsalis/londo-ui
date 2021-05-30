import styled from "styled-components";

import { Box } from "./box";

export const Flex = styled(Box)`
    display: ${(props) => (props.inline ? "inline-flex" : "flex")};
`;

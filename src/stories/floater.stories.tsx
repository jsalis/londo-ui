import { useState } from "react";

import { Floater, Flex, Box, Button } from "../components";

export default {
    title: "Utility/Floater",
    component: Floater,
    parameters: {
        componentSubtitle:
            "Positions an element that pops out from the flow of the document and floats near an anchor element. Used for tooltips, popovers, and dropdowns.",
    },
};

export function Basic(args) {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorNode, setAnchorNode] = useState(null);
    return (
        <Flex gap={2}>
            <Button onClick={() => setIsOpen((s) => !s)}>Toggle</Button>
            <Button ref={setAnchorNode}>Anchor Element</Button>
            <Floater {...args} isOpen={isOpen} anchor={anchorNode}>
                <Box p={2} width={220} borderRadius="base" boxShadow="base" bg="gray.1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere
                    mihi ista probare, quae te dicta?
                </Box>
            </Floater>
        </Flex>
    );
}

Basic.args = {
    placement: "bottom-start",
};

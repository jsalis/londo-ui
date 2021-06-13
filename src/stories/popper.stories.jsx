import { useState } from "react";

import { Popper, Box, Button } from "../components";

export default {
    title: "Utility/Popper",
    component: Popper,
    parameters: {
        componentSubtitle:
            "Positions an element that pops out from the flow of the document and floats near an anchor element. Used for tooltips, popovers, and dropdowns.",
    },
};

export function Basic(args) {
    const [anchorNode, setAnchorNode] = useState(null);
    return (
        <Box width={180}>
            <Button ref={setAnchorNode}>Anchor Element</Button>
            <Popper {...args} anchor={anchorNode}>
                <Box p={2} width={220} borderRadius="base" boxShadow="base" bg="gray.1">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne
                    quae licere mihi ista probare, quae te dicta?
                </Box>
            </Popper>
        </Box>
    );
}

Basic.args = {
    isOpen: true,
    placement: "bottom-start",
};

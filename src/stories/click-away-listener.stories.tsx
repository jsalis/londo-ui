import { ClickAwayListener, Box } from "../components";

export default {
    title: "Utility/ClickAwayListener",
    component: ClickAwayListener,
    parameters: {
        componentSubtitle:
            "Listens for click events that occur somewhere in the document, outside of the element itself.",
    },
};

export function Basic(args) {
    return (
        <ClickAwayListener {...args}>
            <Box p={2} width={1 / 2} bg="primary.base" color="white">
                Click outside this box
            </Box>
        </ClickAwayListener>
    );
}

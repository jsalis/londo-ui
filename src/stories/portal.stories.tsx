import { Portal, Box, Text } from "../components";

export default {
    title: "Utility/Portal",
    component: Portal,
    parameters: {
        componentSubtitle:
            "A react portal that allows nesting to create a natural stacking order for popup elements.",
    },
};

export function Basic() {
    return (
        <Portal>
            <Box p={2} width={1 / 2} bg="primary.base">
                <Text color="white">first</Text>
                <Portal>
                    <Box p={2} width={1 / 2} bg="positive.base">
                        <Text color="white">second</Text>
                    </Box>
                </Portal>
            </Box>
        </Portal>
    );
}

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
            <Box m={1} p={3} top="0" left="0" position="absolute" bg="primary.base">
                <Text color="white">first</Text>
                <Portal>
                    <Box
                        m={1}
                        p={3}
                        top="40px"
                        left="8px"
                        position="absolute"
                        bg="positive.base"
                        opacity={0.8}
                    >
                        <Text color="white">second</Text>
                    </Box>
                </Portal>
            </Box>
        </Portal>
    );
}

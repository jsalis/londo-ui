import { Spacer, Flex, Box } from "../components";

export default {
    title: "Design System/Spacer",
    component: Spacer,
    parameters: {
        componentSubtitle:
            "A component for applying responsive margin and padding to child elements.",
    },
};

export function Basic() {
    return (
        <Spacer mb={2}>
            <Box p={2} width={1 / 2} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={1 / 2} color="white" bg="primary.base">
                Second
            </Box>
            <Box p={2} width={1 / 2} color="white" bg="primary.base">
                Third
            </Box>
        </Spacer>
    );
}

export function Responsive() {
    return (
        <Spacer mb={[1, 2, 3]}>
            <Box p={2} width={1 / 2} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={1 / 2} color="white" bg="primary.base">
                Second
            </Box>
            <Box p={2} width={1 / 2} color="white" bg="primary.base">
                Third
            </Box>
        </Spacer>
    );
}

export function Gutters() {
    return (
        <Flex m={-2} flexWrap="wrap">
            <Spacer m={2}>
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
                <Box size={200} bg="primary.base" />
            </Spacer>
        </Flex>
    );
}

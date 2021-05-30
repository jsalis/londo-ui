import { Box, Spacer } from "../components";

export default {
    title: "Design System/Box",
    component: Box,
    parameters: {
        componentSubtitle: "A responsive box-model layout component.",
    },
};

export function Basic() {
    return (
        <Box p={2} width={1 / 2} bg="primary.base" color="white">
            content
        </Box>
    );
}

export function Width() {
    return (
        <Spacer mb={2}>
            <Box p={2} bg="primary.base" color="white" width={1 / 4}>
                1 / 4
            </Box>
            <Box p={2} bg="primary.base" color="white" width={1 / 2}>
                1 / 2
            </Box>
            <Box p={2} bg="primary.base" color="white" width={3 / 4}>
                3 / 4
            </Box>
            <Box p={2} bg="primary.base" color="white" width={1}>
                1
            </Box>
        </Spacer>
    );
}

export function Padding() {
    return (
        <Spacer mb={2}>
            <Box width={1 / 2} bg="primary.base" color="white" p={0}>
                zero
            </Box>
            <Box width={1 / 2} bg="primary.base" color="white" p="xs">
                xsmall
            </Box>
            <Box width={1 / 2} bg="primary.base" color="white" p="sm">
                small
            </Box>
            <Box width={1 / 2} bg="primary.base" color="white" p="md">
                medium
            </Box>
            <Box width={1 / 2} bg="primary.base" color="white" p="lg">
                large
            </Box>
        </Spacer>
    );
}

export function Colors() {
    return (
        <Spacer mb={2} p={2}>
            <Box width={1 / 2} bg="primary.0">
                primary.0
            </Box>
            <Box width={1 / 2} bg="primary.1">
                primary.1
            </Box>
            <Box width={1 / 2} bg="primary.2">
                primary.2
            </Box>
            <Box width={1 / 2} bg="primary.3">
                primary.3
            </Box>
            <Box width={1 / 2} bg="primary.4" color="white">
                primary.4
            </Box>
            <Box width={1 / 2} bg="primary.5" color="white">
                primary.5
            </Box>
            <Box width={1 / 2} bg="primary.6" color="white">
                primary.6
            </Box>
            <Box width={1 / 2} bg="primary.7" color="white">
                primary.7
            </Box>
            <Box width={1 / 2} bg="primary.8" color="white">
                primary.8
            </Box>
            <Box width={1 / 2} bg="primary.9" color="white">
                primary.9
            </Box>
        </Spacer>
    );
}

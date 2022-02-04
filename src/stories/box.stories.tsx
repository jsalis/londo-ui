import { Box, Flex } from "../components";

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
        <Flex gap={2} direction="column">
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
        </Flex>
    );
}

export function Padding() {
    return (
        <Flex gap={2} direction="column">
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
        </Flex>
    );
}

export function Colors() {
    return (
        <Flex gap={2} direction="column">
            <Box p={2} width={1 / 2} bg="primary.0">
                primary.0
            </Box>
            <Box p={2} width={1 / 2} bg="primary.1">
                primary.1
            </Box>
            <Box p={2} width={1 / 2} bg="primary.2">
                primary.2
            </Box>
            <Box p={2} width={1 / 2} bg="primary.3">
                primary.3
            </Box>
            <Box p={2} width={1 / 2} bg="primary.4" color="white">
                primary.4
            </Box>
            <Box p={2} width={1 / 2} bg="primary.5" color="white">
                primary.5
            </Box>
            <Box p={2} width={1 / 2} bg="primary.6" color="white">
                primary.6
            </Box>
            <Box p={2} width={1 / 2} bg="primary.7" color="white">
                primary.7
            </Box>
            <Box p={2} width={1 / 2} bg="primary.8" color="white">
                primary.8
            </Box>
            <Box p={2} width={1 / 2} bg="primary.9" color="white">
                primary.9
            </Box>
        </Flex>
    );
}

import { Flex, Box } from "../components";

export default {
    title: "Design System/Flex",
    component: Flex,
    parameters: {
        componentSubtitle: "A responsive flex layout component.",
    },
};

export function Basic() {
    return (
        <Flex>
            <Box p={2} width={1 / 3} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={1 / 3} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} width={1 / 3} color="white" bg="success.base">
                Third
            </Box>
        </Flex>
    );
}

export function Column() {
    return (
        <Flex direction="column">
            <Box p={2} width={1 / 3} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={1 / 3} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} width={1 / 3} color="white" bg="success.base">
                Third
            </Box>
        </Flex>
    );
}

export function ResponsiveGap() {
    return (
        <Flex gap={[1, 2, 3]}>
            <Box p={2} width={1 / 3} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={1 / 3} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} width={1 / 3} color="white" bg="success.base">
                Third
            </Box>
        </Flex>
    );
}

export function JustifyContent() {
    const content = (
        <>
            <Box p={2} width={1 / 6} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={1 / 6} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} width={1 / 6} color="white" bg="success.base">
                Third
            </Box>
        </>
    );
    return (
        <Flex gap={2} direction="column">
            <Flex justify="flex-start">{content}</Flex>
            <Flex justify="flex-end">{content}</Flex>
            <Flex justify="center">{content}</Flex>
            <Flex justify="space-between">{content}</Flex>
            <Flex justify="space-around">{content}</Flex>
            <Flex justify="space-evenly">{content}</Flex>
        </Flex>
    );
}

export function Order() {
    return (
        <Flex>
            <Box order={2} p={2} width={1 / 3} color="white" bg="danger.base">
                Second
            </Box>
            <Box order={3} p={2} width={1 / 3} color="white" bg="success.base">
                Third
            </Box>
            <Box order={1} p={2} width={1 / 3} color="white" bg="primary.base">
                First
            </Box>
        </Flex>
    );
}

export function Grow() {
    return (
        <Flex>
            <Box p={2} flexGrow={2} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} flexGrow={1} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} flexGrow={2} color="white" bg="success.base">
                Third
            </Box>
        </Flex>
    );
}

export function FillSpace() {
    return (
        <Flex>
            <Box p={2} width={1 / 6} color="white" bg="primary.base">
                First
            </Box>
            <Box m="auto" />
            <Box p={2} width={1 / 6} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} width={1 / 6} color="white" bg="success.base">
                Third
            </Box>
        </Flex>
    );
}

export function FillRest() {
    return (
        <Flex>
            <Box p={2} width={120} color="white" bg="primary.base">
                First
            </Box>
            <Box p={2} width={120} color="white" bg="danger.base">
                Second
            </Box>
            <Box p={2} flex="auto" color="white" bg="success.base">
                Third
            </Box>
        </Flex>
    );
}

import { Text, Flex } from "../components";

export default {
    title: "Design System/Text",
    component: Text,
    parameters: {
        componentSubtitle: "A responsive inline text component.",
    },
};

export function Basic() {
    return <Text>Hello World</Text>;
}

export function Colors() {
    return (
        <Flex direction="column" gap={2}>
            <Text color="primary.base">Hello World</Text>
            <Text color="secondary.base">Hello World</Text>
            <Text color="success.base">Hello World</Text>
            <Text color="danger.base">Hello World</Text>
            <Text color="warning.base">Hello World</Text>
            <Text color="gray.base">Hello World</Text>
        </Flex>
    );
}

export function Sizes() {
    return (
        <Flex direction="column" gap={2}>
            <Text fontSize={0}>Hello World</Text>
            <Text fontSize={1}>Hello World</Text>
            <Text fontSize={2}>Hello World</Text>
            <Text fontSize={3}>Hello World</Text>
            <Text fontSize={4}>Hello World</Text>
            <Text fontSize={5}>Hello World</Text>
            <Text fontSize={6}>Hello World</Text>
        </Flex>
    );
}

export function Ellipsis() {
    return (
        <Text width={1 / 2} ellipsis>
            Nunc sed blandit libero volutpat sed cras ornare arcu. Facilisi morbi tempus iaculis
            urna id volutpat lacus laoreet non. Varius duis at consectetur lorem donec massa sapien
            faucibus. Id aliquet lectus proin nibh. Quis varius quam quisque id diam vel quam
            elementum. Id consectetur purus ut faucibus pulvinar.
        </Text>
    );
}

export function Disabled() {
    return <Text disabled>Hello World</Text>;
}

export function Strong() {
    return <Text strong>Hello World</Text>;
}

export function Underline() {
    return <Text underline>Hello World</Text>;
}

export function Italic() {
    return <Text italic>Hello World</Text>;
}

export function Delete() {
    return <Text delete>Hello World</Text>;
}

export function Code() {
    return <Text code>Hello World</Text>;
}

export function Keyboard() {
    return (
        <>
            <Text keyboard>Ctrl</Text>
            {" + "}
            <Text keyboard>Shift</Text>
            {" + "}
            <Text keyboard>R</Text>
        </>
    );
}

export function Uppercase() {
    return <Text textTransform="uppercase">Hello World</Text>;
}

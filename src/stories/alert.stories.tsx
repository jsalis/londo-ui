import { actions } from "@storybook/addon-actions";

import { Alert, Flex, Box } from "../components";
import { SunIcon } from "../icons";

const events = actions("onClose", "afterClose");

export default {
    title: "Design System/Alert",
    component: Alert,
    parameters: {
        componentSubtitle: "Provides feedback to the user.",
    },
};

export function Basic() {
    return (
        <Box width={400}>
            <Alert message="Message Text" />
        </Box>
    );
}

export function Closable() {
    return (
        <Box width={400}>
            <Alert {...events} message="Message Text" closable />
        </Box>
    );
}

export function Banner() {
    return (
        <Box width={400}>
            <Alert message="Message Text" banner />
        </Box>
    );
}

export function Types() {
    return (
        <Flex flexDirection="column" gap={2} width={400}>
            <Alert message="Info Text" type="info" />
            <Alert message="Success Text" type="success" />
            <Alert message="Error Text" type="error" />
            <Alert message="Warning Text" type="warning" />
        </Flex>
    );
}

export function CustomIcon() {
    return (
        <Box width={400}>
            <Alert message="Message Text" type="warning" icon={<SunIcon />} />
        </Box>
    );
}

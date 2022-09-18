import { Help, Box } from "../components";

export default {
    title: "Design System/Help",
    component: Help,
    parameters: {
        componentSubtitle: "A text component for showing help messages.",
    },
};

export function Basic({ show, ...args }) {
    return (
        <Box width={300}>
            <Help {...args}>{show && "This is a help message."}</Help>
        </Box>
    );
}

Basic.args = {
    show: true,
};

export function Error({ show, ...args }) {
    return (
        <Box width={300}>
            <Help bg="negative.base" {...args}>
                {show && "This is an error message."}
            </Help>
        </Box>
    );
}

Error.args = {
    show: true,
};

export function Warning({ show, ...args }) {
    return (
        <Box width={300}>
            <Help bg="warning.base" color="gray.3" {...args}>
                {show && "This is a warning message."}
            </Help>
        </Box>
    );
}

Warning.args = {
    show: true,
};

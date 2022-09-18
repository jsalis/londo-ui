import { Help, Box } from "../components";

export default {
    title: "Design System/Help",
    component: Help,
    parameters: {
        componentSubtitle: "A text component for showing help messages.",
    },
};

export function Info({ show, ...args }) {
    return (
        <Box width={300}>
            <Help type="info" {...args}>
                {show && "This is a help message."}
            </Help>
        </Box>
    );
}

Info.args = {
    show: true,
};

export function Error({ show, ...args }) {
    return (
        <Box width={300}>
            <Help type="error" {...args}>
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
            <Help type="warning" {...args}>
                {show && "This is a warning message."}
            </Help>
        </Box>
    );
}

Warning.args = {
    show: true,
};

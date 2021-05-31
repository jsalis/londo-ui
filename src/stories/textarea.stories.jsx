import { Textarea, Box } from "../components";

export default {
    title: "Design System/Textarea",
    component: Textarea,
    parameters: {
        componentSubtitle: "A multi-line text input.",
    },
};

export function Basic(args) {
    return (
        <Box width={300}>
            <Textarea {...args} />
        </Box>
    );
}

Basic.args = {
    rows: 4,
    placeholder: "Placeholder",
};

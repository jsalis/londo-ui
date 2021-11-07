import { ColorInput, Box } from "../components";

export default {
    title: "Design System/ColorInput",
    component: ColorInput,
    parameters: {
        componentSubtitle: "A hex color input.",
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <ColorInput {...args} />
        </Box>
    );
}

Basic.args = {
    value: "#DF212B",
};

import { NumberInput, Box } from "../components";

export default {
    title: "Design System/NumberInput",
    component: NumberInput,
    parameters: {
        componentSubtitle: "",
    },
    argTypes: {
        value: {
            control: "number",
        },
        defaultValue: {
            control: "number",
        },
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <NumberInput {...args} />
        </Box>
    );
}

Basic.args = {
    min: 0,
    step: 0.1,
};

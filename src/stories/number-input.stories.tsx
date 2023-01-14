import { NumberInput, Box } from "../components";

export default {
    title: "Design System/NumberInput",
    component: NumberInput,
    parameters: {
        componentSubtitle: "A numeric input with controls for increasing or decreasing the value.",
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

export function Invalid(args) {
    return (
        <Box width={180}>
            <NumberInput {...args} />
        </Box>
    );
}

Invalid.args = {
    isInvalid: true,
    min: 0,
    step: 0.1,
};

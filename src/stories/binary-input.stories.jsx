import { BinaryInput, Box } from "../components";

export default {
    title: "Design System/BinaryInput",
    component: BinaryInput,
    parameters: {
        componentSubtitle: "A numeric input for values used in bitwise operations.",
    },
    argTypes: {
        value: {
            control: "number",
        },
        defaultValue: {
            control: "number",
        },
        bits: {
            control: { type: "range", min: 1, max: 16, step: 1 },
        },
        max: {
            control: { type: "range", min: 1, max: 16, step: 1 },
        },
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <BinaryInput {...args} />
        </Box>
    );
}

import { NumberInput, Box } from "../components";

export default {
    title: "Design System/NumberInput",
    component: NumberInput,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic() {
    return (
        <Box width={180}>
            <NumberInput min={0} step={0.1} />
        </Box>
    );
}

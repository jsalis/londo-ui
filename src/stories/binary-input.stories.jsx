import { BinaryInput, Box } from "../components";

export default {
    title: "Design System/BinaryInput",
    component: BinaryInput,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic() {
    return (
        <Box width={180}>
            <BinaryInput />
        </Box>
    );
}

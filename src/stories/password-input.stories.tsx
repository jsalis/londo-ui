import { PasswordInput, Box } from "../components";

export default {
    title: "Design System/PasswordInput",
    component: PasswordInput,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <PasswordInput {...args} />
        </Box>
    );
}

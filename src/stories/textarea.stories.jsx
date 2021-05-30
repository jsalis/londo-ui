import { Textarea, Box } from "../components";

export default {
    title: "Design System/Textarea",
    component: Textarea,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic() {
    return (
        <Box width={300}>
            <Textarea rows={4} placeholder="Placeholder" />
        </Box>
    );
}

export function Disabled() {
    return (
        <Box width={300}>
            <Textarea rows={4} placeholder="Placeholder" disabled />
        </Box>
    );
}

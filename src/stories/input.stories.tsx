import { Input, Box } from "../components";

export default {
    title: "Design System/Input",
    component: Input,
    subcomponents: {
        Group: Input.Group,
        Prefix: Input.Prefix,
        Suffix: Input.Suffix,
    },
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <Input {...args} />
        </Box>
    );
}

Basic.args = {
    placeholder: "Placeholder",
};

export function Invalid(args) {
    return (
        <Box width={180}>
            <Input {...args} />
        </Box>
    );
}

Invalid.args = {
    isInvalid: true,
    placeholder: "Placeholder",
};

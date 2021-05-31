import { Select, Box } from "../components";

const numberOptions = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" },
    { value: 6, label: "Six" },
];

export default {
    title: "Design System/Select",
    component: Select,
    subcomponents: {
        Option: Select.Option,
    },
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <Select {...args} />
        </Box>
    );
}

Basic.args = {
    options: numberOptions,
    placeholder: "Select option",
};

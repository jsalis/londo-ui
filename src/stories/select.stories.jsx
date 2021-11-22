import { Select, Box } from "../components";

const numberOptions = [
    { value: 1, label: "One" },
    { value: 2, label: "Two" },
    { value: 3, label: "Three" },
    { value: 4, label: "Four" },
    { value: 5, label: "Five" },
    { value: 6, label: "Six" },
];

const countryOptions = [
    {
        value: "US",
        label: "United States",
        children: (
            <Box>
                <Box mr={1} as="span" role="img" aria-label="United States">
                    🇺🇸
                </Box>
                United States
            </Box>
        ),
    },
    {
        value: "CA",
        label: "Canada",
        children: (
            <Box>
                <Box mr={1} as="span" role="img" aria-label="Canada">
                    🇨🇦
                </Box>
                Canada
            </Box>
        ),
    },
    {
        value: "JP",
        label: "Japan",
        children: (
            <Box>
                <Box mr={1} as="span" role="img" aria-label="Japan">
                    🇯🇵
                </Box>
                Japan
            </Box>
        ),
    },
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

export function CustomOptionRender(args) {
    return (
        <Box width={180}>
            <Select {...args} />
        </Box>
    );
}

CustomOptionRender.args = {
    options: countryOptions,
    placeholder: "Select country",
};

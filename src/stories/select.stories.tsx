import { Select, Box, Button } from "../components";

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
    parameters: {
        componentSubtitle: "A control for picking a value from predefined options.",
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

export function CustomOverlayRender(args) {
    const renderOverlay = (items) => (
        <>
            {items}
            <Box mt={1} p={1} pb={0} borderTop="split">
                <Button width={1} size="sm" variant="text">
                    Add Item
                </Button>
            </Box>
        </>
    );
    return (
        <Box width={180}>
            <Select {...args} renderOverlay={renderOverlay} />
        </Box>
    );
}

CustomOverlayRender.args = {
    options: numberOptions,
    placeholder: "Select option",
};

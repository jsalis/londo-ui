import { Debouncer, Box, Input } from "../components";

export default {
    title: "Utility/Debouncer",
    component: Debouncer,
    parameters: {
        componentSubtitle:
            "Delays invoking a change handler until after a number of milliseconds have elapsed. Can be used as an alternative to the debounce hook for preventing excessive page renders while the user is typing.",
    },
};

export function Basic(args) {
    return (
        <Box width={180}>
            <Debouncer {...args}>
                {({ value, onChange }) => <Input value={value} onChange={onChange} />}
            </Debouncer>
        </Box>
    );
}

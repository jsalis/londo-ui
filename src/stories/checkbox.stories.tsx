import { Checkbox } from "../components";

export default {
    title: "Design System/Checkbox",
    component: Checkbox,
    parameters: {
        componentSubtitle: "An input that allows multiple selections from several options.",
    },
};

export function Basic(args) {
    return <Checkbox {...args}>Enabled</Checkbox>;
}

export function Vertical(args) {
    return (
        <Checkbox {...args} orientation="vertical">
            Enabled
        </Checkbox>
    );
}

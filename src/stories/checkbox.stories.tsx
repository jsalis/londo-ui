import { Checkbox } from "../components";

export default {
    title: "Design System/Checkbox",
    component: Checkbox,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic(args) {
    return <Checkbox {...args}>Enabled</Checkbox>;
}

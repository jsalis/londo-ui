import { Checkbox } from "../components";

export default {
    title: "Design System/Checkbox",
    component: Checkbox,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic() {
    return <Checkbox>Enabled</Checkbox>;
}

export function Disabled() {
    return <Checkbox disabled>Enabled</Checkbox>;
}

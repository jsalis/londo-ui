import { SizePicker } from "../components";

export default {
    title: "Design System/SizePicker",
    component: SizePicker,
    parameters: {
        componentSubtitle: "A selection input for small discrete sizes.",
    },
};

export function Basic(args) {
    return <SizePicker {...args} />;
}

Basic.args = {
    max: [4, 4],
};

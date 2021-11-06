import { ColorPicker } from "../components";

export default {
    title: "Design System/ColorPicker",
    component: ColorPicker,
    parameters: {
        componentSubtitle: "A hex color picker.",
    },
};

export function Basic(args) {
    return <ColorPicker {...args} />;
}

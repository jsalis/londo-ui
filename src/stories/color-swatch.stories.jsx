import { ColorSwatch } from "../components";

export default {
    title: "Design System/ColorSwatch",
    component: ColorSwatch,
    parameters: {
        componentSubtitle: "A box to preview colors.",
    },
};

export function Basic(args) {
    return <ColorSwatch {...args} />;
}

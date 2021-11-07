import { ColorSwatch } from "../components";

export default {
    title: "Design System/ColorSwatch",
    component: ColorSwatch,
    parameters: {
        componentSubtitle: "A box to display color previews.",
    },
};

export function Basic(args) {
    return <ColorSwatch {...args} />;
}

Basic.args = {
    color: "#DF212B",
};

export function Primary(args) {
    return <ColorSwatch {...args} />;
}

Primary.args = {
    primary: true,
    color: "#DF212B",
};

export function Secondary(args) {
    return <ColorSwatch {...args} />;
}

Secondary.args = {
    secondary: true,
    color: "#DF212B",
};

import { useState } from "react";

import { ColorPicker } from "../components";

export default {
    title: "Design System/ColorPicker",
    component: ColorPicker,
    subcomponents: {
        Saturation: ColorPicker.Saturation,
        Hue: ColorPicker.Hue,
    },
    parameters: {
        componentSubtitle: "A hex color picker.",
    },
};

export function Basic(args) {
    const [color, setColor] = useState(args.color);
    return <ColorPicker {...args} color={color} onChange={setColor} />;
}

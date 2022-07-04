import { Radio } from "../components";

export default {
    title: "Design System/Radio",
    component: Radio,
    subcomponents: {
        Group: Radio.Group,
    },
    parameters: {
        componentSubtitle: "An input that allows a single selection from several options.",
    },
};

export function Basic(args) {
    return (
        <Radio.Group name="example" {...args}>
            <Radio value="1">First</Radio>
            <Radio value="2">Second</Radio>
            <Radio value="3">Third</Radio>
        </Radio.Group>
    );
}

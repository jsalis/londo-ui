import { actions } from "@storybook/addon-actions";

import { Slider, Flex } from "../components";

const events = actions("onChange", "onValueChange", "onFocus", "onBlur");

export default {
    title: "Design System/Slider",
    component: Slider,
    parameters: {
        componentSubtitle:
            "An input that allows the user to select a value from within a given range.",
    },
};

export function Basic() {
    return <Slider {...events} width={200} defaultValue={[30]} />;
}

export function Range(args) {
    return <Slider {...events} width={200} defaultValue={[20, 50]} {...args} />;
}

export function Inverted(args) {
    return <Slider {...events} width={200} defaultValue={[30]} {...args} />;
}

Inverted.args = {
    inverted: true,
};

export function Disabled(args) {
    return <Slider {...events} width={200} defaultValue={[30]} {...args} />;
}

Disabled.args = {
    disabled: true,
};

export function WithStep(args) {
    return <Slider {...events} width={200} defaultValue={[30]} {...args} />;
}

WithStep.args = {
    step: 10,
};

export function WithMinAndMax(args) {
    return <Slider {...events} width={200} defaultValue={[120]} {...args} />;
}

WithMinAndMax.args = {
    min: 90,
    max: 180,
};

export function Vertical() {
    return (
        <Flex height={200} gap={3}>
            <Slider {...events} defaultValue={[30]} orientation="vertical" />
            <Slider {...events} defaultValue={[20, 50]} orientation="vertical" />
        </Flex>
    );
}

import { Checkbox } from "../components";

export default {
    title: "Design System/Checkbox",
    component: Checkbox,
    subcomponents: {
        Group: Checkbox.Group,
    },
    parameters: {
        componentSubtitle: "An input that allows multiple selections from several options.",
    },
};

export function Basic(args) {
    return <Checkbox {...args}>Enabled</Checkbox>;
}

export function Group(args) {
    return (
        <Checkbox.Group name="example" defaultValue={["1"]} {...args}>
            <Checkbox value="1">First</Checkbox>
            <Checkbox value="2">Second</Checkbox>
            <Checkbox value="3">Third</Checkbox>
        </Checkbox.Group>
    );
}

export function Disabled(args) {
    return (
        <Checkbox.Group name="example" defaultValue={["1"]} {...args}>
            <Checkbox value="1">First</Checkbox>
            <Checkbox value="2">Second</Checkbox>
            <Checkbox value="3">Third</Checkbox>
        </Checkbox.Group>
    );
}

Disabled.args = {
    disabled: true,
};

export function Invalid(args) {
    return (
        <Checkbox.Group name="example" defaultValue={["1"]} {...args}>
            <Checkbox value="1">First</Checkbox>
            <Checkbox value="2">Second</Checkbox>
            <Checkbox value="3">Third</Checkbox>
        </Checkbox.Group>
    );
}

Invalid.args = {
    isInvalid: true,
};

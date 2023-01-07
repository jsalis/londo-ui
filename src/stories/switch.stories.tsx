import { actions } from "@storybook/addon-actions";

import { Switch, Flex } from "../components";
import { SunIcon, MoonIcon } from "../icons";

const events = actions("onChange", "onFocus", "onBlur");

export default {
    title: "Design System/Switch",
    component: Switch,
    parameters: {
        componentSubtitle:
            "A control that allows the user to toggle between checked and not checked.",
    },
};

export function Basic() {
    return <Switch {...events} defaultChecked />;
}

export function Disabled() {
    return <Switch {...events} defaultChecked disabled />;
}

export function Icons() {
    return (
        <Switch
            {...events}
            checkedContent={<SunIcon />}
            uncheckedContent={<MoonIcon />}
            defaultChecked
        />
    );
}

export function Text() {
    return <Switch {...events} checkedContent="On" uncheckedContent="Off" defaultChecked />;
}

export function Sizes() {
    return (
        <Flex gap={2}>
            <Switch {...events} defaultChecked />
            <Switch {...events} defaultChecked size="small" />
        </Flex>
    );
}

export function Loading(args) {
    return (
        <Flex gap={2}>
            <Switch {...events} defaultChecked {...args} />
            <Switch {...events} size="small" {...args} />
        </Flex>
    );
}

Loading.args = {
    isLoading: true,
};

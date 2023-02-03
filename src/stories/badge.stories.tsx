import { Badge, Avatar } from "../components";
import { UserIcon } from "../icons";

export default {
    title: "Design System/Badge",
    component: Badge,
    parameters: {
        componentSubtitle: "A small numerical value used to highlight an element.",
    },
};

export function Basic(args) {
    return (
        <Badge {...args}>
            <Avatar shape="square" fallback={<UserIcon />} />
        </Badge>
    );
}

Basic.args = {
    count: 5,
};

export function Small(args) {
    return (
        <Badge {...args}>
            <Avatar shape="square" fallback={<UserIcon />} />
        </Badge>
    );
}

Small.args = {
    count: 5,
    size: "sm",
};

export function Dot(args) {
    return (
        <Badge {...args}>
            <Avatar shape="square" fallback={<UserIcon />} />
        </Badge>
    );
}

Dot.args = {
    dot: true,
};

export function Standalone(args) {
    return <Badge {...args} />;
}

Standalone.args = {
    count: 25,
};

export function OverflowCount(args) {
    return (
        <Badge {...args}>
            <Avatar shape="square" fallback={<UserIcon />} />
        </Badge>
    );
}

OverflowCount.args = {
    count: 100,
    overflowCount: 99,
};

export function Offset(args) {
    return (
        <Badge {...args} offset={[-4, 4]}>
            <Avatar shape="circle" fallback={<UserIcon />} />
        </Badge>
    );
}

Offset.args = {
    count: 5,
};

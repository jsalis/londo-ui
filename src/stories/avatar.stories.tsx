// @ts-ignore
import imageSrc from "../../assets/solaire.jpg";
import { Avatar, Badge, Flex } from "../components";
import { UserIcon } from "../icons";

export default {
    title: "Design System/Avatar",
    component: Avatar,
    subcomponents: {
        Group: Avatar.Group,
    },
    parameters: {
        componentSubtitle:
            "An image element with a fallback for representing people or organizations.",
    },
};

export function Basic() {
    return (
        <Flex gap={3} alignItems="center">
            <Avatar src={imageSrc} alt="Solaire" />
            <Avatar fallback="JS" />
            <Avatar fallback={<UserIcon />} />
            <Avatar fallback={<UserIcon />} bg="green.base" />
        </Flex>
    );
}

export function Circle() {
    return (
        <Flex gap={3} alignItems="center">
            <Avatar shape="circle" fallback={<UserIcon />} size={64} />
            <Avatar shape="circle" fallback={<UserIcon />} size={40} />
            <Avatar shape="circle" fallback={<UserIcon />} />
            <Avatar shape="circle" fallback={<UserIcon />} size={24} />
        </Flex>
    );
}

export function Square() {
    return (
        <Flex gap={3} alignItems="center">
            <Avatar shape="square" fallback={<UserIcon />} size={64} />
            <Avatar shape="square" fallback={<UserIcon />} size={40} />
            <Avatar shape="square" fallback={<UserIcon />} />
            <Avatar shape="square" fallback={<UserIcon />} size={24} />
        </Flex>
    );
}

export function Group() {
    return (
        <Avatar.Group shape="circle">
            <Avatar src={imageSrc} alt="Solaire" />
            <Avatar fallback="JS" />
            <Avatar fallback={<UserIcon />} />
            <Avatar fallback={<UserIcon />} bg="green.base" />
        </Avatar.Group>
    );
}

export function WithBadge() {
    return (
        <Flex gap={3} alignItems="center">
            <Badge count={1}>
                <Avatar shape="square" fallback={<UserIcon />} />
            </Badge>
            <Badge dot>
                <Avatar shape="square" fallback={<UserIcon />} />
            </Badge>
        </Flex>
    );
}

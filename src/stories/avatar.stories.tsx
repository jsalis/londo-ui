// @ts-ignore
import imageSrc from "../../assets/solaire.jpg";
import { Avatar, Flex } from "../components";
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
        <Avatar.Group>
            <Avatar shape="circle" src={imageSrc} alt="Solaire" />
            <Avatar shape="circle" fallback="JS" />
            <Avatar shape="circle" fallback={<UserIcon />} />
            <Avatar shape="circle" fallback={<UserIcon />} bg="green.base" />
        </Avatar.Group>
    );
}

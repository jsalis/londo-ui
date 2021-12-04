import { Tag, Flex } from "../components";
import { BrushIcon } from "../icons";

export default {
    title: "Design System/Tag",
    component: Tag,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic(args) {
    return <Tag {...args}>Legendary</Tag>;
}

Basic.args = {
    color: "primary",
};

export function Closable(args) {
    return <Tag {...args}>Legendary</Tag>;
}

Closable.args = {
    closable: true,
};

export function WithIcon(args) {
    return (
        <Tag {...args}>
            <BrushIcon mr={1} />
            Brush
        </Tag>
    );
}

export function StatusColors() {
    return (
        <Flex gap={2} flexWrap="wrap">
            <Tag>Default</Tag>
            <Tag color="primary">Primary</Tag>
            <Tag color="positive">Success</Tag>
            <Tag color="negative">Error</Tag>
            <Tag color="warning">Warning</Tag>
            <Tag color="info">Info</Tag>
        </Flex>
    );
}

export function PresetColors() {
    return (
        <Flex gap={2} flexWrap="wrap">
            <Tag color="magenta">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="volcano">volcano</Tag>
            <Tag color="orange">orange</Tag>
            <Tag color="gold">gold</Tag>
            <Tag color="yellow">yellow</Tag>
            <Tag color="lime">lime</Tag>
            <Tag color="green">green</Tag>
            <Tag color="cyan">cyan</Tag>
            <Tag color="blue">blue</Tag>
            <Tag color="geekblue">geekblue</Tag>
            <Tag color="purple">purple</Tag>
        </Flex>
    );
}

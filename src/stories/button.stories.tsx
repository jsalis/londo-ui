import { Button, Flex } from "../components";

export default {
    title: "Design System/Button",
    component: Button,
    parameters: {
        componentSubtitle: "A button that triggers an operation.",
    },
};

export function Basic(args) {
    return <Button {...args}>Submit</Button>;
}

export function Sizes(args) {
    return (
        <Flex gap={2}>
            <Button {...args} size="sm">
                Small
            </Button>
            <Button {...args} size="md">
                Default
            </Button>
            <Button {...args} size="lg">
                Large
            </Button>
        </Flex>
    );
}

export function Variants(args) {
    return (
        <Flex gap={2}>
            <Button {...args} variant="default">
                Default
            </Button>
            <Button {...args} variant="primary">
                Primary
            </Button>
            <Button {...args} variant="dash">
                Dash
            </Button>
            <Button {...args} variant="text">
                Text
            </Button>
        </Flex>
    );
}

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
            <Button {...args} size="small">
                Small
            </Button>
            <Button {...args} size="default">
                Default
            </Button>
            <Button {...args} size="large">
                Large
            </Button>
        </Flex>
    );
}

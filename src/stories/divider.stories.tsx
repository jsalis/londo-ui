import { Divider, Box, Button, Text } from "../components";

export default {
    title: "Design System/Divider",
    component: Divider,
    decorators: [(story) => <Box width={400}>{story()}</Box>],
    parameters: {
        componentSubtitle: "A horizontal line that separates content such as text and links.",
    },
};

export function Basic(args) {
    return (
        <>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} {...args} />
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function ResponsiveMargin(args) {
    return (
        <>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={[2, 3, 4]} {...args} />
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function Dashed(args) {
    return (
        <>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} dashed {...args} />
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function WithText() {
    return (
        <>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3}>Text</Divider>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="left">
                Left Text
            </Divider>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="right">
                Right Text
            </Divider>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function WithTextDashed() {
    return (
        <>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} dashed>
                Text
            </Divider>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="left" dashed>
                Left Text
            </Divider>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="right" dashed>
                Right Text
            </Divider>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function WithButton(args) {
    return (
        <>
            <Text as="p">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae licere mihi
                ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} {...args}>
                <Button size="sm" variant="text">
                    Show More
                </Button>
            </Divider>
        </>
    );
}

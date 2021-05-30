import { Divider, Box, Button, Text } from "../components";

export default {
    title: "Design System/Divider",
    component: Divider,
    decorators: [(story) => <Box width={400}>{story()}</Box>],
    parameters: {
        componentSubtitle:
            "A horizontal line that separates content such as text and links.",
    },
};

export function Basic() {
    return (
        <>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} />
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function ResponsiveMargin() {
    return (
        <>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={[2, 3, 4]} />
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function Dashed() {
    return (
        <>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} dashed />
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function WithText() {
    return (
        <>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3}>Text</Divider>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="left">
                Left Text
            </Divider>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="right">
                Right Text
            </Divider>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function WithTextDashed() {
    return (
        <>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} dashed>
                Text
            </Divider>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="left" dashed>
                Left Text
            </Divider>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3} align="right" dashed>
                Right Text
            </Divider>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
        </>
    );
}

export function WithButton() {
    return (
        <>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne quae
                licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
            </Text>
            <Divider my={3}>
                <Button>Show More</Button>
            </Divider>
        </>
    );
}

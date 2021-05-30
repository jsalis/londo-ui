import { Skeleton, Box } from "../components";

export default {
    title: "Design System/Skeleton",
    component: Skeleton,
    decorators: [(story) => <Box width={300}>{story()}</Box>],
    parameters: {
        componentSubtitle: "A placeholder to visualise content that is loading.",
    },
};

export function Basic() {
    return <Skeleton />;
}

export function Multiple() {
    return <Skeleton count={4} mb={2} />;
}

export function Duration() {
    return <Skeleton duration={0.5} />;
}

export function Inline() {
    return <Skeleton count={3} width={80} mr={2} />;
}

export function Circle() {
    return <Skeleton size={32} circle />;
}

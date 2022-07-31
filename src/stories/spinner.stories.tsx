import { Spinner } from "../components";

export default {
    title: "Design System/Spinner",
    component: Spinner,
    parameters: {
        componentSubtitle: "Displays a loading state for a page or action.",
    },
};

export function Basic(args) {
    return <Spinner size="1.5rem" {...args} />;
}

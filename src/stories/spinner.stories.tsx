import { Spinner } from "../components";

export default {
    title: "Design System/Spinner",
    component: Spinner,
    parameters: {
        componentSubtitle: "Displays a loading state for a page or action.",
    },
};

export function Basic(args) {
    return <Spinner {...args} />;
}

export function Thickness(args) {
    return <Spinner size="2rem" thickness="4px" {...args} />;
}

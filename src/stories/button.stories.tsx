import { Button } from "../components";

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

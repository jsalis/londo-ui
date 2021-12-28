import { IconButton } from "../components";
import { SaveIcon } from "../icons";

export default {
    title: "Design System/IconButton",
    component: IconButton,
    parameters: {
        componentSubtitle: "An icon button that triggers an operation.",
    },
};

export function Basic() {
    return <IconButton aria-label="Save" icon={<SaveIcon />} />;
}

import { IconButton } from "../components";
import { TrashIcon } from "../icons";

export default {
    title: "Design System/IconButton",
    component: IconButton,
    parameters: {
        componentSubtitle: "An icon button that triggers an operation.",
    },
};

export function Basic() {
    return <IconButton aria-label="Delete" icon={<TrashIcon />} />;
}

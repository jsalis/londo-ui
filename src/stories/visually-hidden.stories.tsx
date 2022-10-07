import { VisuallyHidden, Button } from "../components";
import { SaveIcon } from "../icons";

export default {
    title: "Utility/VisuallyHidden",
    component: VisuallyHidden,
    parameters: {
        componentSubtitle:
            "Provides text for screen readers that is visually hidden. It is the logical opposite of the aria-hidden attribute.",
    },
};

export function Basic() {
    return (
        <Button size="sm">
            <VisuallyHidden>Save</VisuallyHidden>
            <SaveIcon aria-hidden />
        </Button>
    );
}

import { FocusLock, Flex, Button } from "../components";

export default {
    title: "Utility/FocusLock",
    component: FocusLock,
    parameters: {
        componentSubtitle: "Locks the focus inside a component.",
    },
};

export function Basic(args) {
    return (
        <FocusLock autoFocus {...args}>
            <Flex gap={2}>
                <Button>Cancel</Button>
                <Button>Submit</Button>
            </Flex>
        </FocusLock>
    );
}

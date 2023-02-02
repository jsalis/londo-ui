import { actions } from "@storybook/addon-actions";

import { ToastProvider, useToast, Flex, Button } from "../components";
import { SunIcon } from "../icons";

const events = actions("onClose");

export default {
    title: "Design System/Toast",
    component: ToastProvider,
    parameters: {
        componentSubtitle: "A brief message that is displayed temporarily.",
    },
    decorators: [
        (Story) => (
            <ToastProvider>
                <Story />
            </ToastProvider>
        ),
    ],
};

export function Basic() {
    const toast = useToast();
    return (
        <Button
            onClick={() => {
                toast.open({
                    title: "Title",
                    description: "This is the content of the toast.",
                    ...events,
                });
            }}
        >
            Open
        </Button>
    );
}

export function Types() {
    const toast = useToast();
    const openToast = (type) => {
        toast[type]({
            title: "Title",
            description: "This is the content of the toast.",
            ...events,
        });
    };
    return (
        <Flex gap={2}>
            <Button onClick={() => openToast("info")}>Info</Button>
            <Button onClick={() => openToast("success")}>Success</Button>
            <Button onClick={() => openToast("error")}>Error</Button>
            <Button onClick={() => openToast("warning")}>Warning</Button>
        </Flex>
    );
}

export function WithAction() {
    const toast = useToast();
    return (
        <Button
            onClick={() => {
                toast.open({
                    title: "Title",
                    description: "This is the content of the toast.",
                    actionAltText: "Undo",
                    action: <Button>Undo</Button>,
                    ...events,
                });
            }}
        >
            Open
        </Button>
    );
}

export function CustomIcon() {
    const toast = useToast();
    return (
        <Button
            onClick={() => {
                toast.warning({
                    title: "Title",
                    description: "This is the content of the toast.",
                    icon: <SunIcon />,
                    ...events,
                });
            }}
        >
            Open
        </Button>
    );
}

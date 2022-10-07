import { useState } from "react";

import { Modal, Button } from "../components";

export default {
    title: "Design System/Modal",
    component: Modal,
    subcomponents: {
        Header: Modal.Header,
        Body: Modal.Body,
        Footer: Modal.Footer,
    },
    parameters: {
        componentSubtitle: "A window overlaid on the primary window.",
    },
    argTypes: {
        isOpen: {
            control: null,
        },
    },
};

const lorem = (
    <p>
        Sunt ad dolore quis aute consequat. Magna exercitation reprehenderit magna aute tempor
        cupidatat consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum
        quis. Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et mollit
        incididunt nisi consectetur esse laborum eiusmod pariatur proident Lorem eiusmod et. Culpa
        deserunt nostrud ad veniam.
    </p>
);

export function Basic(args) {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    return (
        <>
            <Button onClick={onOpen}>Open</Button>
            <Modal {...args} isOpen={isOpen} onClose={onClose}>
                <Modal.Header>Title</Modal.Header>
                <Modal.Body>
                    {lorem}
                    {lorem}
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="primary">Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

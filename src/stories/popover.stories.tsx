import { Popover, Box, Button } from "../components";

const sampleText = `
	Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
	incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
	nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
`;

export default {
    title: "Design System/Popover",
    component: Popover,
    parameters: {
        componentSubtitle: "A non-modal that floats around a trigger element.",
    },
};

export function Basic(args) {
    return (
        <Popover {...args}>
            <Button>Hover here</Button>
        </Popover>
    );
}

Basic.args = {
    title: "Title",
    content: sampleText,
    placement: "bottom-start",
};

export function TriggerOnClick(args) {
    return (
        <Popover {...args}>
            <Button>Click here</Button>
        </Popover>
    );
}

TriggerOnClick.args = {
    title: "Title",
    content: sampleText,
    placement: "bottom-start",
    trigger: "click",
};

export function Placements() {
    const buttonWidth = 80;
    return (
        <Box height={200}>
            <Box
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                }}
            >
                <div style={{ marginLeft: buttonWidth + 16, whiteSpace: "nowrap" }}>
                    <Popover placement="top" title="Title" content={sampleText}>
                        <Button width={buttonWidth}>Top</Button>
                    </Popover>
                </div>
                <div style={{ width: buttonWidth, float: "left" }}>
                    <Popover placement="left" title="Title" content={sampleText}>
                        <Button width={buttonWidth}>Left</Button>
                    </Popover>
                </div>
                <div style={{ width: buttonWidth, marginLeft: buttonWidth + 112 }}>
                    <Popover placement="right" title="Title" content={sampleText}>
                        <Button width={buttonWidth}>Right</Button>
                    </Popover>
                </div>
                <div style={{ marginLeft: buttonWidth + 16, whiteSpace: "nowrap" }}>
                    <Popover placement="bottom" title="Title" content={sampleText}>
                        <Button width={buttonWidth}>Bottom</Button>
                    </Popover>
                </div>
            </Box>
        </Box>
    );
}

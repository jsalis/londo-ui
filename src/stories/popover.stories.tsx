import { Popover, Box, Button } from "../components";

export default {
    title: "Design System/Popover",
    component: Popover,
    parameters: {
        componentSubtitle: "",
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
    content: "Hello World",
    placement: "bottom",
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
                    <Popover placement="top" title="Title" content="Hello World">
                        <Button width={buttonWidth}>Top</Button>
                    </Popover>
                </div>
                <div style={{ width: buttonWidth, float: "left" }}>
                    <Popover placement="left" title="Title" content="Hello World">
                        <Button width={buttonWidth}>Left</Button>
                    </Popover>
                </div>
                <div style={{ width: buttonWidth, marginLeft: buttonWidth + 112 }}>
                    <Popover placement="right" title="Title" content="Hello World">
                        <Button width={buttonWidth}>Right</Button>
                    </Popover>
                </div>
                <div style={{ marginLeft: buttonWidth + 16, whiteSpace: "nowrap" }}>
                    <Popover placement="bottom" title="Title" content="Hello World">
                        <Button width={buttonWidth}>Bottom</Button>
                    </Popover>
                </div>
            </Box>
        </Box>
    );
}

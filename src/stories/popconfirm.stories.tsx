import { Popconfirm, Box, Button } from "../components";

export default {
    title: "Design System/Popconfirm",
    component: Popconfirm,
    parameters: {
        componentSubtitle: "A compact dialog for requesting user confirmation.",
    },
};

export function Basic(args) {
    return (
        <Popconfirm {...args}>
            <Button>Click here</Button>
        </Popconfirm>
    );
}

Basic.args = {
    title: "Are you sure?",
    placement: "bottom-start",
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
                    <Popconfirm placement="top" title="Are you sure?">
                        <Button width={buttonWidth}>Top</Button>
                    </Popconfirm>
                </div>
                <div style={{ width: buttonWidth, float: "left" }}>
                    <Popconfirm placement="left" title="Are you sure?">
                        <Button width={buttonWidth}>Left</Button>
                    </Popconfirm>
                </div>
                <div style={{ width: buttonWidth, marginLeft: buttonWidth + 112 }}>
                    <Popconfirm placement="right" title="Are you sure?">
                        <Button width={buttonWidth}>Right</Button>
                    </Popconfirm>
                </div>
                <div style={{ marginLeft: buttonWidth + 16, whiteSpace: "nowrap" }}>
                    <Popconfirm placement="bottom" title="Are you sure?">
                        <Button width={buttonWidth}>Bottom</Button>
                    </Popconfirm>
                </div>
            </Box>
        </Box>
    );
}

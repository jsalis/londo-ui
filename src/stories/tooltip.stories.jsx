import { Tooltip, Box, Button } from "../components";

export default {
    title: "Design System/Tooltip",
    component: Tooltip,
    parameters: {
        componentSubtitle: "",
    },
};

export function Basic() {
    return (
        <Tooltip title="Title" placement="bottom">
            <Button>Hover here</Button>
        </Tooltip>
    );
}

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
                    <Tooltip placement="top" title="Title">
                        <Button width={buttonWidth}>Top</Button>
                    </Tooltip>
                </div>
                <div style={{ width: buttonWidth, float: "left" }}>
                    <Tooltip placement="left" title="Title">
                        <Button width={buttonWidth}>Left</Button>
                    </Tooltip>
                </div>
                <div style={{ width: buttonWidth, marginLeft: buttonWidth + 112 }}>
                    <Tooltip placement="right" title="Title">
                        <Button width={buttonWidth}>Right</Button>
                    </Tooltip>
                </div>
                <div style={{ marginLeft: buttonWidth + 16, whiteSpace: "nowrap" }}>
                    <Tooltip placement="bottom" title="Title">
                        <Button width={buttonWidth}>Bottom</Button>
                    </Tooltip>
                </div>
            </Box>
        </Box>
    );
}

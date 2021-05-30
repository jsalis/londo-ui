import { Icon } from "../components";

export function UndoIcon(props) {
    return (
        <Icon {...props} viewBox="0 0 512 512">
            <path
                style={{
                    fill: "none",
                    stroke: "currentColor",
                    strokeLinejoin: "round",
                    strokeWidth: "40px",
                }}
                d="M240,424V328c116.4,0,159.39,33.76,208,96,0-119.23-39.57-240-208-240V88L64,256Z"
            />
        </Icon>
    );
}

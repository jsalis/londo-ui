import { Icon } from "../components";

export function RedoIcon(props) {
    return (
        <Icon {...props} viewBox="0 0 512 512">
            <path
                style={{
                    fill: "none",
                    stroke: "currentColor",
                    strokeLinejoin: "round",
                    strokeWidth: "40px",
                }}
                d="M448,256,272,88v96C103.57,184,64,304.77,64,424c48.61-62.24,91.6-96,208-96v96Z"
            />
        </Icon>
    );
}

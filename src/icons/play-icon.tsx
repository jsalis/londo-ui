import type { IconProps } from "../components";
import { Icon } from "../components";

export function PlayIcon(props: IconProps) {
    return (
        <Icon {...props} viewBox="0 0 512 512">
            <path
                style={{
                    fill: "none",
                    stroke: "currentColor",
                    strokeMiterlimit: 10,
                    strokeWidth: "40px",
                }}
                d="M112 111v290c0 17.44 17 28.52 31 20.16l247.9-148.37c12.12-7.25 12.12-26.33 0-33.58L143 90.84c-14-8.36-31 2.72-31 20.16z"
            />
        </Icon>
    );
}

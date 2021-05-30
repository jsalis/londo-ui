import { Icon } from "../components";

export function RefreshIcon(props) {
    return (
        <Icon {...props} viewBox="0 0 512 512">
            <path
                style={{
                    fill: "none",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeMiterlimit: 10,
                    strokeWidth: "40px",
                }}
                d="M320,146s24.36-12-64-12A160,160,0,1,0,416,294"
            />
            <polyline
                style={{
                    fill: "none",
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "40px",
                }}
                points="256 58 336 138 256 218"
            />
        </Icon>
    );
}

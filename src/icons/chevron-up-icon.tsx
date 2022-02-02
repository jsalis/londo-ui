import type { IconProps } from "../components";
import { Icon } from "../components";

export function ChevronUpIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M6.293 13.293L7.707 14.707 12 10.414 16.293 14.707 17.707 13.293 12 7.586z" />
        </Icon>
    );
}

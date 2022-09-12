import type { IconProps } from "../components";
import { Icon } from "../components";

export function EllipsisHorizontalIcon(props: IconProps) {
    return (
        <Icon {...props} viewBox="0 0 512 512">
            <circle cx="256" cy="256" r="48" />
            <circle cx="416" cy="256" r="48" />
            <circle cx="96" cy="256" r="48" />
        </Icon>
    );
}

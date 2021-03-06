import type { IconProps } from "../components";
import { Icon } from "../components";

export function CloseIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z" />
        </Icon>
    );
}

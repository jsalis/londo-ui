import type { IconProps } from "../components";
import { Icon } from "../components";

export function CheckIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z" />
        </Icon>
    );
}

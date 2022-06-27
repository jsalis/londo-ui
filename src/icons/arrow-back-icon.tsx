import type { IconProps } from "../components";
import { Icon } from "../components";

export function ArrowBackIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L2.586 12l7.707 7.707 1.414-1.414L6.414 13H21z" />
        </Icon>
    );
}

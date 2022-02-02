import type { IconProps } from "../components";
import { Icon } from "../components";

export function ChevronDownIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M16.293 9.293L12 13.586 7.707 9.293 6.293 10.707 12 16.414 17.707 10.707z" />
        </Icon>
    );
}

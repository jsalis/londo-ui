import type { IconProps } from "../components";
import { Icon } from "../components";

export function PlusIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" />
        </Icon>
    );
}

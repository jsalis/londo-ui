import type { IconProps } from "../components";
import { Icon } from "../components";

export function DownloadIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path d="m12 16 4-5h-3V4h-2v7H8z" />
            <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z" />
        </Icon>
    );
}

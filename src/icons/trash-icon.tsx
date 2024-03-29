import type { IconProps } from "../components";
import { Icon } from "../components";

export function TrashIcon(props: IconProps) {
    return (
        <Icon {...props}>
            <path
                fill="none"
                d="M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z"
            />
            <path d="M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z" />
            <path d="M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z" />
        </Icon>
    );
}

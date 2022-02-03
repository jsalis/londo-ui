import { isValidElement, cloneElement, forwardRef } from "react";

import type { ButtonProps } from "./button";
import { Button } from "./button";
import { VisuallyHidden } from "./visually-hidden";

export interface IconButtonProps extends ButtonProps {
    "aria-label": string;
    icon: React.ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({ "aria-label": label, icon, color, ...rest }, ref) => {
        const children = isValidElement(icon) ? cloneElement(icon, { "aria-hidden": true }) : null;
        return (
            <Button ref={ref} aria-label={label} p={1} color={color as any} {...rest}>
                <VisuallyHidden>{label}</VisuallyHidden>
                {children}
            </Button>
        );
    }
);

if (process.env.NODE_ENV !== "production") {
    IconButton.displayName = "IconButton";
}

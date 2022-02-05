import { forwardRef } from "react";

import type { InputProps } from "./input";
import { Input } from "./input";

export interface TextareaProps extends InputProps {}

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>((props, ref) => {
    return <Input ref={ref} as="textarea" height="auto" minHeight={54} py={1} {...props} />;
});

if (process.env.NODE_ENV !== "production") {
    Textarea.displayName = "Textarea";
}

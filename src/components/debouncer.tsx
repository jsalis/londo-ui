import { useDebounceState } from "../hooks";

export interface DebouncerProps {
    value: any;
    onChange: (value: any) => void;
    wait?: number;
    leading?: boolean;
    children: (props: { value: any; onChange: (value: any) => void }) => React.ReactNode;
}

export function Debouncer({
    value,
    onChange,
    wait = 400,
    leading = false,
    children,
}: DebouncerProps) {
    const [currentValue, setCurrentValue] = useDebounceState(value, onChange, wait, leading);
    return <>{children({ value: currentValue, onChange: setCurrentValue })}</>;
}

if (process.env.NODE_ENV !== "production") {
    Debouncer.displayName = "Debouncer";
}

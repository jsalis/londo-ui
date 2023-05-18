import { useState } from "react";

import { Box, Input, Debouncer } from "../../src";

export function SearchConsumer({ children, ...rest }) {
    const [value, setValue] = useState("");
    return (
        <>
            <Box mb={4}>
                <Debouncer value={value} onChange={setValue}>
                    {({ value, onChange }) => <Input {...rest} value={value} onChange={onChange} />}
                </Debouncer>
            </Box>
            {children(value)}
        </>
    );
}

import { useState } from "react";

import { Box, Input, Debouncer, SearchIcon } from "../../src";

export function SearchConsumer({ children, ...rest }) {
    const [value, setValue] = useState("");
    return (
        <>
            <Box mb={4}>
                <Debouncer value={value} onChange={setValue}>
                    {({ value, onChange }) => (
                        <Input.Group width={300}>
                            <Input {...rest} value={value} onChange={onChange} />
                            <Input.Suffix>
                                <SearchIcon />
                            </Input.Suffix>
                        </Input.Group>
                    )}
                </Debouncer>
            </Box>
            {children(value)}
        </>
    );
}

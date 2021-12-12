import { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { useControllableState } from "../hooks";

import { Box } from "./box";
import { Label } from "./label";

function getCellColor({ theme, active, selectionActive }) {
    if (selectionActive) {
        return theme.colors.primary[2];
    }

    if (active) {
        return theme.colors.primary.base;
    }

    return theme.colors.alpha[1];
}

export const StyledCell = styled.td`
    &::before {
        background: ${getCellColor};
        border-radius: ${(p) => p.theme.radii.base}px;
        height: 100%;
        display: block;
        content: "";
    }
`;

export const StyledTable = styled.table`
    border: 0;
    border-spacing: 0;
    border-collapse: collapse;

    tbody {
        td {
            width: 32px;
            height: 32px;
            padding: 4px;
            cursor: pointer;
            -webkit-touch-callout: none;
            user-select: none;
        }
    }
`;

export function SizePicker({ value, onChange, defaultValue, max, ...rest }) {
    const [selection, setSelection] = useState(null);
    const [size, setSize] = useControllableState(value, defaultValue);

    const [width, height] = size;
    const [maxWidth, maxHeight] = max;
    const rows = [...Array(maxHeight).keys()];
    const columns = [...Array(maxWidth).keys()];

    const onClick = () => {
        if (selection) {
            const nextValue = [selection.width, selection.height];
            setSize(nextValue);
            onChange?.(nextValue);
        }
    };

    const onMouseLeave = () => {
        if (selection) {
            setSelection(null);
        }
    };

    return (
        <Box {...rest}>
            <StyledTable onClick={onClick} onMouseLeave={onMouseLeave}>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row}>
                            {columns.map((col) => (
                                <DataCell
                                    key={col}
                                    width={col + 1}
                                    height={row + 1}
                                    value={size}
                                    selection={selection}
                                    setSelection={setSelection}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
            <Label p={1}>
                {selection?.width ?? width}x{selection?.height ?? height}
            </Label>
        </Box>
    );
}

function DataCell({ width, height, value, selection, setSelection }) {
    const active = !selection && width <= value[0] && height <= value[1];
    const selectionActive = selection && width <= selection.width && height <= selection.height;

    const onMouseMove = (event) => {
        event.preventDefault();
        if (!selection || selection.width !== width || selection.height !== height) {
            setSelection({ width, height });
        }
    };

    return (
        <StyledCell active={active} selectionActive={selectionActive} onMouseMove={onMouseMove} />
    );
}

if (process.env.NODE_ENV !== "production") {
    SizePicker.displayName = "SizePicker";
    SizePicker.propTypes = {
        value: PropTypes.arrayOf(PropTypes.number),
        defaultValue: PropTypes.arrayOf(PropTypes.number),
        max: PropTypes.arrayOf(PropTypes.number),
        onChange: PropTypes.func,
        className: PropTypes.string,
    };
}

SizePicker.defaultProps = {
    defaultValue: [1, 1],
    max: [4, 4],
};

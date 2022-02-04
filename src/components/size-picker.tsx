import { useState } from "react";
import styled from "styled-components";

import { useControllableState } from "../hooks";

import { Label } from "./label";

type Selection = { width: number; height: number };

interface StyledCellProps {
    active: boolean;
    selectionActive: boolean;
}

interface DataCellProps {
    width: number;
    height: number;
    value: [number, number];
    selection: Selection | null;
    onSelectionChange: (val: Selection) => void;
}

export interface SizePickerProps {
    value?: [number, number];
    defaultValue?: [number, number];
    max?: [number, number];
    onChange?: (val: [number, number]) => void;
}

function getCellColor({ theme, active, selectionActive }: any) {
    if (selectionActive) {
        return theme.colors.primary[2];
    }

    if (active) {
        return theme.colors.primary.base;
    }

    return theme.colors.alpha[1];
}

const StyledCell = styled.td<StyledCellProps>`
    &::before {
        background: ${getCellColor};
        border-radius: ${(p) => p.theme.radii.base}px;
        height: 100%;
        display: block;
        content: "";
    }
`;

const StyledTable = styled.table`
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

function DataCell({ width, height, value, selection, onSelectionChange }: DataCellProps) {
    const active = !selection && width <= value[0] && height <= value[1];
    const selectionActive = !!selection && width <= selection.width && height <= selection.height;

    const onMouseMove = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!selection || selection.width !== width || selection.height !== height) {
            onSelectionChange({ width, height });
        }
    };

    return (
        <StyledCell active={active} selectionActive={selectionActive} onMouseMove={onMouseMove} />
    );
}

export function SizePicker({ value, defaultValue, max, onChange }: SizePickerProps) {
    const defaultSize: [number, number] = [1, 1];
    const [selection, setSelection] = useState<Selection | null>(null);
    const [size, setSize] = useControllableState(value, defaultValue ?? defaultSize);

    const [width, height] = size;
    const [maxWidth, maxHeight] = max ?? defaultSize;
    const rows = [...Array(maxHeight).keys()];
    const columns = [...Array(maxWidth).keys()];

    const onClick = () => {
        if (selection) {
            const nextValue: [number, number] = [selection.width, selection.height];
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
        <div>
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
                                    onSelectionChange={setSelection}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
            <Label p={1}>
                {selection?.width ?? width}x{selection?.height ?? height}
            </Label>
        </div>
    );
}

if (process.env.NODE_ENV !== "production") {
    SizePicker.displayName = "SizePicker";
}

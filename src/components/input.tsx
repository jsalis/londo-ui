import type * as CSS from "csstype";
import type {
    SpaceProps,
    LayoutProps,
    PositionProps,
    FlexboxProps,
    ColorProps,
    ResponsiveValue,
} from "styled-system";
import { forwardRef, cloneElement } from "react";
import styled from "styled-components";
import { system, space, layout, position, flexbox, color } from "styled-system";

import { getValidChildren } from "../utils/react-util";
import { useControllableState } from "../hooks";

import type { FlexProps } from "./flex";
import { Flex } from "./flex";

export interface InputGroupProps extends FlexProps {}

export interface InputElementProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
        SpaceProps,
        LayoutProps,
        PositionProps,
        FlexboxProps,
        ColorProps {
    textTransform?: ResponsiveValue<CSS.Property.TextTransform>;
    pointerEvents?: ResponsiveValue<CSS.Property.PointerEvents>;
    cursor?: ResponsiveValue<CSS.Property.Cursor>;
}

export interface InputProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            "size" | "width" | "height" | "color" | "onChange"
        >,
        SpaceProps,
        LayoutProps,
        FlexboxProps,
        ColorProps {
    as?: keyof JSX.IntrinsicElements;
    value?: any;
    defaultValue?: any;
    onChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    isInvalid?: boolean;
    textTransform?: ResponsiveValue<CSS.Property.TextTransform>;
    pointerEvents?: ResponsiveValue<CSS.Property.PointerEvents>;
    cursor?: ResponsiveValue<CSS.Property.Cursor>;
}

const other = system({
    textTransform: true,
    pointerEvents: true,
    cursor: true,
});

const StyledInput = styled.input`
    width: 100%;
    min-width: 0;
    height: 24px;
    padding: 0 4px;
    line-height: ${(p) => p.theme.lineHeights.base};
    outline: 0;
    position: relative;
    appearance: none;
    transition: all 0.2s, height 0ms;
    border: ${(p) => p.theme.borders.base};
    border-radius: ${(p) => p.theme.radii.base}px;
    background: ${(p) => p.theme.colors.gray[1]};
    ${space}
    ${layout}
    ${flexbox}
    ${color}
    ${other}

    &:hover:enabled {
        border-color: ${(p) => p.theme.colors.gray[5]};
    }

    &:focus:enabled {
        border-color: ${(p) => p.theme.colors.primary.hover};
        box-shadow: 0 0 0 1px ${(p) => p.theme.colors.primary.hover};
        z-index: 1;
    }

    &:read-only {
        user-select: all;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &[data-invalid]:not(:disabled) {
        border-color: ${(p) => p.theme.colors.danger.base};

        &:hover:enabled {
            border-color: ${(p) => p.theme.colors.danger.hover};
        }

        &:focus:enabled {
            border-color: ${(p) => p.theme.colors.danger.hover};
            box-shadow: 0 0 0 1px ${(p) => p.theme.colors.danger.hover};
        }
    }
`;

const InputElement = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    min-width: 24px;
    height: 24px;
    font-size: 14px;
    padding: 0 4px;
    color: ${(p) => p.theme.colors.alpha[5]};
    pointer-events: none;
    z-index: 2;
    ${space}
    ${layout}
    ${position}
    ${flexbox}
    ${color}
    ${other}
`;

const Group = forwardRef<HTMLDivElement, InputGroupProps>(({ color, children, ...rest }, ref) => {
    const groupStyles = {} as { paddingLeft: number; paddingRight: number };
    const validChildren = getValidChildren(children);

    validChildren.forEach((child: any) => {
        if (child.type.id === "InputPrefix") {
            groupStyles.paddingLeft = 24;
        }

        if (child.type.id === "InputSuffix") {
            groupStyles.paddingRight = 24;
        }
    });

    const clones = validChildren.map((child: any) => {
        const { pl, pr } = child.props;
        return child.type.id === "Input"
            ? cloneElement(child, {
                  pl: pl ?? groupStyles?.paddingLeft,
                  pr: pr ?? groupStyles?.paddingRight,
              })
            : child;
    });

    return (
        <Flex ref={ref} position="relative" width={1} zIndex={0} color={color as any} {...rest}>
            {clones}
        </Flex>
    );
});

const Prefix = forwardRef<HTMLDivElement, InputElementProps>(({ color, ...rest }, ref) => {
    return <InputElement ref={ref} left="0" color={color as any} {...rest} />;
});

const CompoundPrefix = Object.assign(Prefix, {
    id: "InputPrefix",
});

const Suffix = forwardRef<HTMLDivElement, InputElementProps>(({ color, ...rest }, ref) => {
    return <InputElement ref={ref} right="0" color={color as any} {...rest} />;
});

const CompoundSuffix = Object.assign(Suffix, {
    id: "InputSuffix",
});

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const {
        type = "text",
        value,
        defaultValue = "",
        color,
        size,
        width,
        height,
        onChange,
        isInvalid,
        ...rest
    } = props;

    const [inputValue, setInputValue] = useControllableState(value, defaultValue);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setInputValue(val);
        onChange?.(val, event);
    };

    return (
        <StyledInput
            ref={ref}
            type={type}
            value={inputValue}
            onChange={handleChange}
            size={size as any}
            width={width as any}
            height={height as any}
            color={color as any}
            data-invalid={isInvalid ? "" : null}
            {...rest}
        />
    );
});

const CompoundInput = Object.assign(Input, {
    id: "Input",
    Group: Group,
    Prefix: CompoundPrefix,
    Suffix: CompoundSuffix,
});

export { CompoundInput as Input };

if (process.env.NODE_ENV !== "production") {
    Input.displayName = "Input";
    Group.displayName = "InputGroup";
    CompoundPrefix.displayName = "InputPrefix";
    CompoundSuffix.displayName = "InputSuffix";
}

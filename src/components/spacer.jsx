import { Children, isValidElement, cloneElement } from "react";
import styled from "styled-components";
import { margin } from "styled-system";

const cx = (...args) => args.join(" ");
const getClassName = (el) => (el.props && el.props.className) || "";

export const Spacer = styled(({ className, children }) => {
    const styledChildren = Children.toArray(children).map((child) => {
        return isValidElement(child)
            ? cloneElement(child, {
                  className: cx(getClassName(child), className),
              })
            : child;
    });
    return <>{styledChildren}</>;
})(margin);

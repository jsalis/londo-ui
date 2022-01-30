/**
 * Gets the owner document of an HTML element.
 */
export function ownerDocument(node: HTMLElement | null) {
    return node?.ownerDocument ?? document;
}

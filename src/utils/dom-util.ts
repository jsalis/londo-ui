/**
 * Gets the owner document of an HTML element.
 */
export function ownerDocument(node?: Node | null) {
    return node?.ownerDocument ?? document;
}

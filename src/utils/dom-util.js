/**
 * Gets the owner document of an HTML element.
 *
 * @param   {HTMLElement || null} node
 * @returns {Document}
 */
export function ownerDocument(node) {
    return node?.ownerDocument ?? document;
}

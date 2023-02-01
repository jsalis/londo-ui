/**
 * Creates a shallow copy of an object excluding the given properties.
 */
export function omit(obj: object, keys: string[]) {
    const result: any = Object.assign({}, obj);

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        delete result[key];
    }

    return result;
}

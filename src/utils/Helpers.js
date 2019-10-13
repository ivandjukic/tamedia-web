export function isObjectEmpty(object) {
    if (object === null) {
        return false;
    }
    return Object.keys(object).length === 0 && object.constructor === Object
}
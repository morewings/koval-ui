export const get = <TObject = Record<string, unknown>, TValue = unknown>(
    obj: TObject,
    path: string,
    defaultValue?: TValue
) => {
    const travel = (regexp: RegExp) =>
        String.prototype.split
            .call(path, regexp)
            .filter(Boolean)
            // @ts-expect-error TODO: improve type
            .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
    const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
    return result === undefined || result === obj ? defaultValue : result;
};

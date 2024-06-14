export const without = <TValue>(value: TValue, array: TValue[]) => {
    return array.filter(member => member !== value);
};

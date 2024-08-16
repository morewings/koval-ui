export const isBrowser = () => {
    return Boolean(globalThis?.document);
};

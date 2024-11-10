/** Gets media filename from the provided URL string */
export const getFileName = (url?: string) => {
    const splitted = url?.split('/') || [];
    return splitted[splitted.length - 1];
};

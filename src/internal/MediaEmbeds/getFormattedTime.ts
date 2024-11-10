export const getFormattedTime = (totalSeconds = 0) => {
    const minutes = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2}).format(
        Math.floor(totalSeconds / 60)
    );
    const seconds = new Intl.NumberFormat(undefined, {minimumIntegerDigits: 2}).format(
        Math.round(totalSeconds % 60)
    );
    return `${minutes}:${seconds}`;
};

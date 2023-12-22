const padZero = (str: string, len = 2) => {
    const zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
};

const invertColorChannel = (channelValue: number) => {
    return (255 - channelValue).toString(16);
};

export const invertColor = (hex: string, bw: boolean) => {
    if (hex.startsWith('#')) {
        hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    const red = parseInt(hex.slice(0, 2), 16);
    const green = parseInt(hex.slice(2, 4), 16);
    const blue = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        // https://stackoverflow.com/a/3943023/112731
        return red * 0.299 + green * 0.587 + blue * 0.114 > 186 ? '#000000' : '#FFFFFF';
    }
    // invert color components and pad each with zeros
    return (
        '#' + padZero(invertColorChannel(red)) + padZero(invertColorChannel(green)) + padZero(invertColorChannel(blue))
    );
};

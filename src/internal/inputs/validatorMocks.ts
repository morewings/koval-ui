export const validatorSync = (value?: unknown) => {
    console.log('Value captured:', value);
    if (value && `${value}`.length > 3) {
        return 'Too long';
    } else {
        return '';
    }
};

const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const validatorAsync = async (value?: unknown) => {
    console.log('Value captured:', value);
    await timeout(1000);
    if (value && `${value}`.length > 3) {
        return 'too long';
    } else {
        return '';
    }
};

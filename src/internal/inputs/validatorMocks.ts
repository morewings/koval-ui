export const validatorSync = (value?: unknown) => {
    console.log('Value captured:', value);
    if (value && `${value}`.length > 3) {
        return 'Too long';
    } else {
        return '';
    }
};

export const validatorSyncBoolean = (value?: unknown) => {
    console.log('Value captured:', value);
    if (value) {
        return 'Restricted option!';
    } else {
        return '';
    }
};

export const timeout = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const validatorAsync = async (value?: unknown) => {
    console.log('Value captured:', value);
    await timeout(1000);
    if (value && `${value}`.length > 3) {
        return `Last captured: ${value}`;
    } else {
        return '';
    }
};

export const validatorAsyncBoolean = async (value?: unknown) => {
    console.log('Value captured:', value);
    await timeout(1000);
    if (value) {
        return `Restricted option! Last captured: ${value}`;
    } else {
        return '';
    }
};

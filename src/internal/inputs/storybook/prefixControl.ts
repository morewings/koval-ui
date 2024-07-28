import {CloudUpload} from '@/internal/Icons';

export const prefixControl = {
    options: ['noPrefix', 'withPrefix'],
    mapping: {
        noPrefix: undefined,
        withPrefix: CloudUpload,
    },
    control: {
        type: 'radio',
        labels: {
            // 'labels' maps option values to string labels
            noPrefix: 'No prefix',
            withPrefix: 'With prefix',
        },
    },
};

export const patternControl = {
    options: ['noPattern', 'withPattern'], // An array of serializable values
    mapping: {
        noPattern: undefined,
        withPattern: '[^@\\s]+@[^@\\s]+',
    }, // Maps serializable option values to complex arg values
    control: {
        type: 'radio', // Type 'select' is automatically inferred when 'options' is defined
        labels: {
            // 'labels' maps option values to string labels
            noPattern: 'No pattern',
            withPattern: 'With pattern ([^@\\s]+@[^@\\s]+)',
        },
    },
};

export const localeControl = {
    options: ['noLocale', 'default', 'german', 'irish', 'ukrainian'],
    mapping: {
        noLocale: undefined,
        default: 'en-US',
        german: 'de-DE',
        irish: 'ga-IE',
        ukrainian: 'uk-UA',
    },
    control: {
        type: 'radio',
        labels: {
            noLocale: 'No locale / User locale',
            default: 'Default locale (US)',
            german: 'German locale',
            irish: 'Irish locale',
            ukrainian: 'Ukrainian locale',
        },
    },
};

import {forwardRef, useMemo} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import type {CountryCodes} from '@/internal/locale';
import {useBrowserLocale} from '@/internal/locale';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';

import classes from './Flag.module.css';
import {flagsDictionary} from './flagsDictionary.ts';

export type Props = DataAttributes &
    LibraryProps & {
        /**
         * Provide a two-letter ISO 3166 region code
         * @see https://www.iso.org/iso-3166-country-codes.html
         */
        countryCode: keyof typeof CountryCodes;
        /**
         * Set the size of the flag icon in pixels. Applied to both width and height
         */
        size?: number;
    };

export const Flag = forwardRef<HTMLDivElement, Props>(
    ({className, countryCode, size = 24, ...nativeProps}, outerRef) => {
        const {LocalRoot, ref} = useLocalTheme<HTMLDivElement>();
        const theme = useMemo(() => ({size}), [size]);
        useLinkRefs(outerRef, ref);
        const flag = flagsDictionary[countryCode];
        const userLocale = useBrowserLocale();
        const countryName = useMemo(
            () => new Intl.DisplayNames(userLocale, {type: 'region'}).of(countryCode),
            [countryCode, userLocale]
        );
        return (
            <LocalRoot
                {...nativeProps}
                theme={theme}
                className={classNames(classes.container, className)}>
                <span className={classes.flag} title={countryName}>
                    {flag}
                </span>
            </LocalRoot>
        );
    }
);

Flag.displayName = 'Flag';

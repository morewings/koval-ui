import type {
    ReactNode,
    HTMLAttributeReferrerPolicy,
    IframeHTMLAttributes,
    SyntheticEvent,
} from 'react';
import {useCallback} from 'react';
import {useState} from 'react';
import {useMemo} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {SkeletonShape} from '@/lib/Skeleton';

import classes from './Iframe.module.css';
import type {SandboxConfig, PermissionsConfig} from './types.ts';
import {convertPermissions} from './convertPermissions.ts';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Provide an url of the embedded page */
        src?: string;
        /**
         * Provide custom HTML for the iframe.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/srcdoc
         */
        srcDoc?: string;
        /**
         * Set the width of the iframe in pixels.
         * Responsive
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/width
         */
        width: number;
        /**
         * Set the height of the iframe in pixels.
         * Responsive
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/height
         */
        height: number;
        /**
         * Define which referrer is sent when fetching the resource.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/referrerPolicy
         */
        referrerPolicy?: HTMLAttributeReferrerPolicy;
        /**
         * Allow the iframe's contents to use requestFullscreen().
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/allowFullscreen
         */
        allowFullScreen?: boolean;
        /**
         * Provide a unique name for the iframe.
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/name
         * @example
         * <iframe id="el" name="example"></iframe>
         * const el = document.getElementById("el");
         * console.log(el.name); // Output: "example"
         */
        name?: string;
        /**
         * Provide a title for accessibility
         */
        title?: string;
        /**
         * Set iframe loading behavior
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/loading
         */
        loading?: IframeHTMLAttributes<unknown>['loading'];
        /**
         * Provide a SandboxConfig object.
         * @see SandboxConfig
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/sandbox
         */
        sandboxConfig?: SandboxConfig;
        /**
         * Provide a callback to capture iframe loaded event.
         */
        onLoad?: (event: SyntheticEvent<HTMLIFrameElement>) => void;
        /**
         * Provide a PermissionsConfig object.
         * @see PermissionsConfig
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/allow
         */
        permissionsConfig?: PermissionsConfig;
    };

export const Iframe = forwardRef<HTMLIFrameElement, Props>(
    (
        {
            children,
            className,
            src,
            width,
            height,
            referrerPolicy,
            allowFullScreen,
            name,
            title,
            srcDoc,
            loading,
            sandboxConfig,
            permissionsConfig,
            onLoad = () => {},
            ...nativeProps
        },
        ref
    ) => {
        const [isLoaded, setIsLoaded] = useState(false);

        const handleLoad = useCallback(
            (event: SyntheticEvent<HTMLIFrameElement>) => {
                onLoad(event);
                setIsLoaded(true);
            },
            [onLoad]
        );

        const sandbox =
            sandboxConfig &&
            Object.entries(sandboxConfig)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(' ');

        const allow = permissionsConfig && convertPermissions(permissionsConfig);

        const theme = useMemo(
            () => ({
                height,
                width,
            }),
            [height, width]
        );

        const {LocalRoot} = useLocalTheme();
        return (
            <LocalRoot theme={theme} className={classes.sizeContainer}>
                <div className={classes.ratioContainer}>
                    <iframe
                        {...nativeProps}
                        className={classNames(classes.iframe, className)}
                        ref={ref}
                        onLoad={handleLoad}
                        loading={loading}
                        name={name}
                        width={width}
                        height={height}
                        src={src}
                        title={title}
                        srcDoc={srcDoc}
                        allow={allow}
                        referrerPolicy={referrerPolicy}
                        allowFullScreen={allowFullScreen}
                        sandbox={sandbox}
                    />
                    {!isLoaded && (
                        <SkeletonShape
                            width={width}
                            height={height}
                            borderRadius={0}
                            className={classes.loader}
                        />
                    )}
                </div>
            </LocalRoot>
        );
    }
);

Iframe.displayName = 'Iframe';

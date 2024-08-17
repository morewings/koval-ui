import type {
    ReactNode,
    HTMLAttributeReferrerPolicy,
    IframeHTMLAttributes,
    SyntheticEvent,
} from 'react';
import {useMemo} from 'react';
import {forwardRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';

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
        sandbox?: SandboxConfig;
        /**
         * Provide a callback to capture iframe loaded event.
         */
        onLoad?: (event: SyntheticEvent<HTMLIFrameElement>) => void;
        /**
         * Provide a PermissionsConfig object.
         * @see PermissionsConfig
         * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/allow
         */
        permissions?: PermissionsConfig;
        /**
         * Enable to render border around iframe
         */
        showBorder?: boolean;
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
            sandbox: sandboxProp,
            permissions: permissionsProp,
            onLoad = () => {},
            showBorder = true,
            ...nativeProps
        },
        ref
    ) => {
        const sandbox =
            sandboxProp &&
            Object.entries(sandboxProp)
                .filter(([_, value]) => value)
                .map(([key]) => key)
                .join(' ');

        const permissions = permissionsProp && convertPermissions(permissionsProp);

        const theme = useMemo(
            () => ({
                height,
                width,
            }),
            [height, width]
        );

        const {LocalRoot} = useLocalTheme();
        return (
            <LocalRoot theme={theme} className={classNames({[classes.frame]: showBorder})}>
                <div className={classes.sizeContainer}>
                    <div className={classes.ratioContainer}>
                        <iframe
                            {...nativeProps}
                            className={classNames(classes.iframe, className)}
                            ref={ref}
                            onLoad={onLoad}
                            loading={loading}
                            name={name}
                            width={width}
                            height={height}
                            src={src}
                            title={title}
                            srcDoc={srcDoc}
                            allow={permissions}
                            referrerPolicy={referrerPolicy}
                            allowFullScreen={allowFullScreen}
                            sandbox={sandbox}
                        />
                    </div>
                </div>
            </LocalRoot>
        );
    }
);

Iframe.displayName = 'Iframe';

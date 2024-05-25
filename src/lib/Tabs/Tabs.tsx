import type {ReactElement} from 'react';
import {useEffect, useMemo, forwardRef, Children, useState, useCallback, useRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {useLinkRefs} from '@/internal/hooks/useLinkRefs.ts';
import {useIsOverflow} from '@/internal/hooks/useIsOverflow.ts';
import {IconScroll} from '@/internal/Icons';

import type {Props as TabProps} from './Tab.tsx';
import {TabButton} from './TabButton.tsx';
import classes from './Tabs.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        selected?: string;
        width?: number;
        height?: number;
        children: ReactElement<TabProps> | ReactElement<TabProps>[];
        onToggle?: (tabName: string) => void;
    };

export const Tabs = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            selected: selectedProp,
            width,
            height,
            onToggle = () => {},
            ...nativeProps
        },
        ref
    ) => {
        const {LocalRoot, ref: innerRef} = useLocalTheme<HTMLDivElement>();

        useLinkRefs(ref, innerRef);

        const theme = useMemo(() => {
            let theme = {};
            if (height) {
                theme = {...theme, height};
            }
            if (width) {
                theme = {...theme, width};
            }
            return theme;
        }, [height, width]);

        const initiallySelected = useMemo(
            () =>
                selectedProp
                    ? selectedProp
                    : (Children.toArray(children)[0] as ReactElement<TabProps>).props.name,
            [children, selectedProp]
        );

        const [selected, setSelected] = useState(initiallySelected);

        useEffect(() => {
            if (selectedProp) {
                setSelected(selectedProp);
            } else {
                setSelected(initiallySelected);
            }
        }, [selectedProp, initiallySelected]);

        const handleClick = useCallback(
            (tabName: string) => {
                setSelected(tabName);
                onToggle(tabName);
            },
            [onToggle]
        );

        const tabs = useMemo(
            () =>
                Children.map(children, element => {
                    return {tabName: element.props.name, icon: element.props.icon};
                }),
            [children]
        );

        const visibleTab = useMemo(
            () =>
                (Children.toArray(children) as ReactElement<TabProps>[]).find(
                    element => element.props.name === selected
                ),
            [children, selected]
        );

        const headerRef = useRef<HTMLElement>(null);

        const {overflowX} = useIsOverflow(headerRef);

        return (
            <LocalRoot
                {...nativeProps}
                theme={theme}
                className={classNames(classes.tabs, className)}>
                <div className={classes.viewport}>
                    <header ref={headerRef} className={classes.header}>
                        {tabs.map(({tabName, icon}) => {
                            return (
                                <TabButton
                                    key={tabName}
                                    icon={icon}
                                    onClick={handleClick}
                                    tabName={tabName}
                                    activeName={selected}
                                />
                            );
                        })}
                    </header>
                    {overflowX && (
                        <div className={classes['overflow-indicator']}>
                            <IconScroll />
                        </div>
                    )}
                </div>
                <div className={classes.content}>{visibleTab}</div>
            </LocalRoot>
        );
    }
);

Tabs.displayName = 'Tabs';

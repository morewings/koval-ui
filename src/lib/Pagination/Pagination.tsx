import type {ReactNode, ChangeEvent, KeyboardEvent} from 'react';
import {useMemo} from 'react';
import {useCallback, useEffect, useState, Fragment, forwardRef} from 'react';
import classNames from 'classnames';
import {useLocalTheme} from 'css-vars-hook';

import type {DataAttributes, LibraryProps} from '@/internal/LibraryAPI';
import {createArray} from '@/internal/utils/createArray.ts';
import {IconForward, IconBackward, IconEnter} from '@/internal/Icons';

import {PageButton} from './PageButton.tsx';
import {usePagePaginationState} from './usePagePaginationState.ts';
import classes from './Pagination.module.css';

export type Props = DataAttributes &
    LibraryProps & {
        children?: ReactNode;
        /** Set total amount of pages */
        totalPages: number;
        /** Callback to run on page change */
        onPageSelect: (pageNumber: number) => void;
        /** Set selected page externally */
        selectedPage: number;
        /** Show navigation block on the right */
        showNavigation?: boolean;
        /** Show page number buttons on the left */
        showPageButtons?: boolean;
    };

export const Pagination = forwardRef<HTMLDivElement, Props>(
    (
        {
            children,
            className,
            totalPages,
            onPageSelect,
            selectedPage: selectedPageProp,
            showNavigation = true,
            showPageButtons = true,
            ...nativeProps
        },
        ref
    ) => {
        const {
            visible,
            first,
            last,
            selectedPage,
            setSelectedPage,
            nextPage,
            previousPage,
            isLong,
            maxDigits,
            checkValidity,
        } = usePagePaginationState(totalPages, selectedPageProp);

        const [inputPage, setInputPage] = useState<number | null>(selectedPage);

        useEffect(() => {
            setSelectedPage(selectedPageProp);
        }, [selectedPageProp, setSelectedPage]);

        const handlePageSelect = useCallback(
            (pageNumber: number) => {
                setSelectedPage(pageNumber);
                onPageSelect(pageNumber);
            },
            [onPageSelect, setSelectedPage]
        );

        const handleIncrement = useCallback(() => {
            setSelectedPage(nextPage);
            onPageSelect(nextPage);
        }, [nextPage, onPageSelect, setSelectedPage]);

        const handleDecrement = useCallback(() => {
            setSelectedPage(previousPage);
            onPageSelect(previousPage);
        }, [onPageSelect, previousPage, setSelectedPage]);

        const handleInputChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const nextValue = event.target.value !== '' ? parseInt(event.target.value) : null;
                setInputPage(nextValue);
            },
            [setInputPage]
        );

        const handleSubmitClick = useCallback(() => {
            checkValidity(inputPage) && inputPage !== null && handlePageSelect(inputPage);
        }, [checkValidity, handlePageSelect, inputPage]);

        const handleInputEnter = useCallback(
            (event: KeyboardEvent<HTMLInputElement>) => {
                if (event.key === 'Enter') {
                    checkValidity(inputPage) && inputPage !== null && handlePageSelect(inputPage);
                }
            },
            [checkValidity, handlePageSelect, inputPage]
        );

        const {LocalRoot} = useLocalTheme();

        const theme = useMemo(
            () => ({
                digits: maxDigits,
            }),
            [maxDigits]
        );

        return (
            <div {...nativeProps} className={classNames(classes.pagination, className)} ref={ref}>
                {showPageButtons && (
                    <div className={classes.buttons}>
                        {!isLong &&
                            createArray(totalPages).map((_, i) => {
                                const pageNumber = i + 1;
                                const isActive = pageNumber === selectedPage;
                                return (
                                    <PageButton
                                        key={i}
                                        isActive={isActive}
                                        onClick={handlePageSelect}
                                        pageNumber={i + 1}
                                    />
                                );
                            })}
                        {isLong && (
                            <Fragment>
                                <PageButton
                                    isActive={first === selectedPage}
                                    onClick={handlePageSelect}
                                    pageNumber={first}
                                />
                                <div className={classes.ellipsis}>&hellip;</div>
                                {visible.map(pageNumber => {
                                    const isActive = pageNumber === selectedPage;
                                    return (
                                        <PageButton
                                            key={pageNumber}
                                            isActive={isActive}
                                            onClick={handlePageSelect}
                                            pageNumber={pageNumber}
                                        />
                                    );
                                })}
                                <div className={classes.ellipsis}>&hellip;</div>
                                <PageButton
                                    isActive={last === selectedPage}
                                    onClick={handlePageSelect}
                                    pageNumber={last}
                                />
                            </Fragment>
                        )}
                    </div>
                )}

                {showNavigation && (
                    <LocalRoot className={classes.navigation} theme={theme}>
                        <div className={classes.navigationBlock}>
                            <button onClick={handleDecrement} className={classes.navigationButton}>
                                <IconBackward className={classes.icon} />
                            </button>
                            <button onClick={handleIncrement} className={classes.navigationButton}>
                                <IconForward className={classes.icon} />
                            </button>
                        </div>
                        <div className={classes.navigationBlock}>
                            <input
                                className={classNames(classes.input, {[classes.error]: !checkValidity(inputPage)})}
                                min={first}
                                max={last}
                                pattern="[0-9]{10}"
                                step="1"
                                size={maxDigits}
                                type="number"
                                defaultValue={selectedPage}
                                onChange={handleInputChange}
                                onKeyUp={handleInputEnter}
                            />
                            <button
                                disabled={!checkValidity(inputPage) || inputPage === null}
                                className={classes.navigationButton}
                                onClick={handleSubmitClick}>
                                <IconEnter className={classes.icon} />
                            </button>
                        </div>
                    </LocalRoot>
                )}
            </div>
        );
    }
);

Pagination.displayName = 'Pagination';

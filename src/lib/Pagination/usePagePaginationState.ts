import {useCallback, useState} from 'react';

const getVisible = (totalPages: number, selectedPage: number) => {
    switch (selectedPage) {
        case 1: {
            return [selectedPage + 1, selectedPage + 2, selectedPage + 3];
        }
        case 2: {
            return [selectedPage, selectedPage + 1, selectedPage + 2];
        }
        case totalPages: {
            return [selectedPage - 3, selectedPage - 2, selectedPage - 1];
        }
        case totalPages - 1: {
            return [selectedPage - 2, selectedPage - 1, selectedPage];
        }
        default: {
            return [selectedPage - 1, selectedPage, selectedPage + 1];
        }
    }
};

export const usePagePaginationState = (totalPages: number, initiallySelected: number) => {
    const [selectedPage, setSelectedPage] = useState(initiallySelected);
    const first = 1;
    const last = totalPages;
    const visible = getVisible(totalPages, selectedPage);
    const nextPage = selectedPage + 1 <= totalPages ? selectedPage + 1 : 1;
    const previousPage = selectedPage - 1 >= 1 ? selectedPage - 1 : totalPages;
    const isLong = totalPages > 7;
    const maxDigits = totalPages.toString().length + 1;
    const checkValidity = useCallback(
        (pageNumber: number | null) => {
            if (pageNumber === null) {
                return true;
            }
            return pageNumber >= 1 && pageNumber <= totalPages;
        },
        [totalPages]
    );
    return {
        first,
        last,
        visible,
        setSelectedPage,
        selectedPage,
        nextPage,
        previousPage,
        isLong,
        maxDigits,
        checkValidity,
    };
};

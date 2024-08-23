export type Props = {
    tableHeightProp: number | 'full';
};

export const useTableHeight = ({tableHeightProp}: Props) => {
    if (tableHeightProp === 'full') {
        return '100vh';
    } else {
        return `${tableHeightProp}px`;
    }
};

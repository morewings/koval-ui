import type {FC} from 'react';
// @ts-expect-error TODO: maybe fix later
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import {styled} from '@storybook/theming';

const gradient =
    'linear-gradient(-45deg, transparent, transparent 45%, pink 45%, pink 55%, transparent 55%, transparent 100%)';

export const Color: FC<{colorName?: string}> = ({colorName = gradient}) => {
    return <ColorDiv style={{background: colorName}} />;
};

export const ColorDiv = styled.div({
    width: '16px',
    height: '16px',
    borderRadius: '8px',
    border: '1px solid lightgray',
});

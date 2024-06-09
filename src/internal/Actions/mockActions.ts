// eslint-disable-next-line import/no-extraneous-dependencies
import {fn} from '@storybook/test';

import {CloudUpload, IconFile} from '@/internal/Icons';
import type {Props as ActionProps} from '@/internal/Actions/Action.tsx';

export const actionsMockMultiple = [
    {title: 'Default Action', onClick: fn()},
    {title: 'With Icon', icon: IconFile, onClick: fn()},
    {title: 'Link Action', type: 'link', onClick: fn()},
    {title: 'Overridden icon', type: 'link', icon: CloudUpload, onClick: fn()},
    [
        {title: 'Danger Action', type: 'danger', onClick: fn()},
        {title: 'Success Action', type: 'success', onClick: fn()},
    ],
] as (ActionProps | [ActionProps, ActionProps])[];

export const actionsMockMultipleFlat = [
    {title: 'Default Action', onClick: fn()},
    {title: 'With Icon', icon: IconFile, onClick: fn()},
    {title: 'Link Action', type: 'link', onClick: fn()},
    {title: 'Extra long name action', type: 'link', onClick: fn()},
    {title: 'Danger Action', type: 'danger', onClick: fn()},
    {title: 'Success Action', type: 'success', onClick: fn()},
] as (ActionProps | [ActionProps, ActionProps])[];

export const actionsMockDouble = [
    [
        {title: 'Danger Action', type: 'danger', onClick: fn()},
        {title: 'Success Action', type: 'success', onClick: fn()},
    ],
] as (ActionProps | [ActionProps, ActionProps])[];

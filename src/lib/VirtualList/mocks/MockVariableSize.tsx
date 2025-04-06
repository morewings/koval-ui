import type {FC} from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import {uniqueNamesGenerator} from 'unique-names-generator';

import {Dl} from '@/lib/Text';
import {Picture} from '@/lib/Picture';

import classes from './MockContent.module.css';

export type Props = {
    header: string;
    description: string;
    character: string;
    seed: number;
};

const sizes: string[] = [
    '-35',
    '-10',
    '0',
    '15',
    '35',
    '50',
    '65',
    '75',
    '90',
    '100',
    '110',
    '125',
    '145',
    '170',
    '190',
    '200',
    '230',
    '245',
    '265',
    '330',
];

export const MockVariableSize: FC<Props> = ({header, description, character, seed}) => {
    const test =
        160 +
        Number(
            uniqueNamesGenerator({
                dictionaries: [sizes],
                seed,
            })
        );
    return (
        <div className={classes.wrapper}>
            <div className={classes.info}>
                <Picture
                    src={`https://picsum.photos/160/${test}/`}
                    width={160}
                    height={test}
                    alt={description}
                />
                <Dl>
                    <dt>Animal</dt>
                    <dd>
                        {header}. {description}
                    </dd>
                    <dt>Character</dt>
                    <dd>{character}</dd>
                </Dl>
            </div>
        </div>
    );
};

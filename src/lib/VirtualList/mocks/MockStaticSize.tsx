import type {FC} from 'react';

import {H3, Dl} from '@/lib/Text';
import {Picture} from '@/lib/Picture';

import classes from './MockContent.module.css';

export type Props = {
    header: string;
    description: string;
    character: string;
};

export const MockStaticSize: FC<Props> = ({header, description, character}) => {
    return (
        <div className={classes.wrapper}>
            <H3>{header}</H3>
            <div className={classes.info}>
                <Picture
                    src={`https://picsum.photos/122?${character}`}
                    width={122}
                    height={122}
                    alt={description}
                />
                <Dl>
                    <dt>Animal</dt>
                    <dd>{description}</dd>
                    <dt>Character</dt>
                    <dd>{character}</dd>
                </Dl>
            </div>
        </div>
    );
};

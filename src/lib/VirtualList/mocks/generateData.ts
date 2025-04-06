// import { faker, fakerDE, fakerUK } from '@faker-js/faker';
// eslint-disable-next-line import/no-extraneous-dependencies
import {uniqueNamesGenerator, animals, colors, starWars} from 'unique-names-generator';

import {createArray} from '@/internal/utils/createArray.ts';

export const generateData = (rowsAmount: number, seed?: number) => {
    return createArray(rowsAmount).map((_, i) => {
        const hasSeed = seed !== undefined;
        return {
            cardTitle: `List element #${i + 1}`,
            color: uniqueNamesGenerator({
                dictionaries: [colors],
                ...(hasSeed && {seed: seed + i}),
                style: 'capital',
            }),
            animal: uniqueNamesGenerator({
                dictionaries: [animals],
                ...(hasSeed && {seed: seed + i}),
                style: 'capital',
            }),
            character: uniqueNamesGenerator({
                dictionaries: [starWars],
                ...(hasSeed && {seed: seed + i}),
                style: 'capital',
            }),
        };
    });
};

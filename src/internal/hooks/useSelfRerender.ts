import {useReducer} from 'react';

export const useSelfRerender = () => {
    const [, selfRerender] = useReducer(x => x + 1, 0);
    return selfRerender;
};

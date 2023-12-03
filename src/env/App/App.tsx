import type {FC} from 'react';

import {Counter} from '@/lib';

import './../../lib/global.css';
import './index.css';

const App: FC = () => {
    return (
        <div>
            <Counter />
        </div>
    );
};

export default App;

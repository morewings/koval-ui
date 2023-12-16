// import { useEffect, useCallback, useState } from 'react';
//
// export type UseKeyPressParams = {
//     /** Target key value */
//     targetKey: KeyboardEvent['key'];
//     /** keyDown event callback */
//     onKeyDown?: (arg0?: KeyboardEvent) => void;
//     /** keyDown event callback */
//     onKeyUp?: (arg0?: KeyboardEvent) => void;
//     /** Flag to enable event.preventDefault() behavior */
//     preventDefault?: boolean;
// };
//
// /**
//     React hook which allows to subscribe to keyboard events via callback
//     @example
//     const { element, setElement } = useKeyPress({
//         targetKey: ARROW_DOWN_KEY,
//         onKeyUp: () => {},
//     });
//     return <div ref={setElement} />
// */
// export const useKeyPress = ({
//     targetKey,
//     onKeyDown = () => {},
//     onKeyUp = () => {},
//     preventDefault
// }: UseKeyPressParams) => {
//     const [element, setElement] = useState<HTMLElement | null>(null);
//     const downHandler = useCallback(
//         (event: KeyboardEvent) => {
//             if (event.key === targetKey) {
//                 preventDefault && event.preventDefault();
//                 onKeyDown(event);
//             }
//         },
//         [targetKey, preventDefault, onKeyDown]
//     );
//     const upHandler = useCallback(
//         (event: KeyboardEvent) => {
//             if (event.key === targetKey) {
//                 preventDefault && event.preventDefault();
//                 onKeyUp(event);
//             }
//         },
//         [targetKey, preventDefault, onKeyUp]
//     );
//     useEffect(() => {
//         element && element.addEventListener('keydown', downHandler);
//         element && element.addEventListener('keyup', upHandler);
//         return () => {
//             element && element.removeEventListener('keydown', downHandler);
//             element && element.removeEventListener('keyup', upHandler);
//         };
//     }, [downHandler, upHandler, element]);
//     return { element, setElement };
// };

export {};

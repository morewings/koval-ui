// import { useRef } from 'react';
//
// /**
//  * React hook to detect first render
//  * @example
//  * const isFirst = useIsFirstRender();
//  * useEffect(() => {
//  *   !isFirst && doSomething();
//  * }, [isFirst, doSomething]);
//  */
// export const useIsFirstRender = () => {
//     const isFirst = useRef(true);
//     if (isFirst.current) {
//         isFirst.current = false;
//         return true;
//     }
//     return isFirst.current;
// };

export {};

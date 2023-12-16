// import type { MouseEvent } from 'react';
// import { useEffect } from 'react';
//
// /**
//  * React hook. Detects outside click and runs provided callback.
//  * NB! Doesn't work with `useRef`!
//  * @example
//  * // define custom ref (element) getter and setter
//  * const [element, setElement] = useState<HTMLDivElement | null>(null);
//  * const callback = (e: MouseEvent) => {...}
//  * useOutsideClick(element, callback)
//  * // or
//  * useOutsideClick([element1, element2, ...], callback)
//  * // use custom element setter instead of useRef
//  * return <div ref={setElement}></div>
//  */
// const useOutsideClick = <TElement extends HTMLElement>(
//     element: TElement | null | (TElement | null)[],
//     callback: (e: MouseEvent<TElement>) => void
// ) => {
//     const isArray = Array.isArray(element);
//
//     const hasMount = isArray
//         ? element.every(current => Boolean(current))
//         : Boolean(element);
//
//     const isTarget = (target: Node | null = null) =>
//         isArray
//             ? element.some(current => current?.contains(target))
//             : element?.contains(target);
//
//     const handleClickOutside = (event: any) => {
//         if (hasMount && !isTarget(event.target)) {
//             callback(event);
//         }
//     };
//
//     useEffect(() => {
//         document.addEventListener('click', handleClickOutside);
//
//         return () => {
//             document.removeEventListener('click', handleClickOutside);
//         };
//     });
// };
//
// export default useOutsideClick;

export {};

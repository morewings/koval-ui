// import { useMatchMedia } from './useMatchMedia';
// import { SMALL, EXTRA_SMALL, MEDIUM, LARGE, EXTRA_LARGE } from '@/utils/mediaQueries';
//
// export type BreakpointType = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
//
// /** React hook, use to get current matching breakpoint */
// export const useBreakpoint = (): BreakpointType => {
//     const extraSmall = useMatchMedia(EXTRA_SMALL);
//     const small = useMatchMedia(SMALL);
//     const medium = useMatchMedia(MEDIUM);
//     const large = useMatchMedia(LARGE);
//     const extraLarge = useMatchMedia(EXTRA_LARGE);
//     return Object.entries({ extraSmall, small, medium, large, extraLarge })
//         .filter(([, value]) => value)
//         .map(([value]) => value)[0] as unknown as BreakpointType;
// };

export {};

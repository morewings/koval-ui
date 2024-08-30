export type Enumerate<
    TNumber extends number,
    TAccumulator extends number[] = [],
> = TAccumulator['length'] extends TNumber
    ? TAccumulator[number]
    : Enumerate<TNumber, [...TAccumulator, TAccumulator['length']]>;

export type Range<TStart extends number, TFinish extends number> = Exclude<
    Enumerate<TFinish>,
    Enumerate<TStart>
>;

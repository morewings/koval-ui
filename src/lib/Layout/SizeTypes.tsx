export enum Sizes {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
}

export enum Offsets {
    xs = 'shiftXS',
    sm = 'shiftSM',
    md = 'shiftMD',
    lg = 'shiftLG',
    xl = 'shiftXL',
}

export type SizeUnit = number;
export type FluidUnit = 'fluid';

export type SizesConfig = {
    /** The number of columns to span on tiny devices (≥360px) */
    [Sizes.xs]: SizeUnit | FluidUnit;
    /** The number of columns to span on small devices (≥640px) */
    [Sizes.sm]: SizeUnit | FluidUnit;
    /** The number of columns to span on medium devices (≥992px) */
    [Sizes.md]: SizeUnit | FluidUnit;
    /** The number of columns to span on large devices (≥1366px) */
    [Sizes.lg]: SizeUnit | FluidUnit;
    /** The number of columns to span on extremely large devices (≥1920px) */
    [Sizes.xl]: SizeUnit | FluidUnit;
};

export type OffsetConfig = {
    /** The number of columns to off set this item from left side on extremely small devices (≥360px) */
    [Offsets.xs]: SizeUnit;
    /** The number of columns to off set this item from left side on small devices (≥640px) */
    [Offsets.sm]: SizeUnit;
    /** The number of columns to off set this item from left side on medium devices (≥768px) */
    [Offsets.md]: SizeUnit;
    /** The number of columns to off set this item from left side on large devices (≥1366px) */
    [Offsets.lg]: SizeUnit;
    /** The number of columns to off set this item from left side on extremely large devices (≥1920px) */
    [Offsets.xl]: SizeUnit;
};

export enum Sizes {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl'
}

export enum Offsets {
    xs = 'offsetXS',
    sm = 'offsetSM',
    md = 'offsetMD',
    lg = 'offsetLG',
    xl = 'offsetXL'
}

export type SizeUnit = number;
export type FluidUnit = 'fluid';

export type SizesConfig = {
    /** The number of columns to span on extremely small devices (≥360px) */
    [Sizes.xs]: SizeUnit | FluidUnit;
    /** The number of columns to span on small devices (≥576px) */
    [Sizes.sm]: SizeUnit | FluidUnit;
    /** The number of columns to span on medium devices (≥768px) */
    [Sizes.md]: SizeUnit | FluidUnit;
    /** The number of columns to span on large devices (≥992px) */
    [Sizes.lg]: SizeUnit | FluidUnit;
    /** The number of columns to span on extremely large devices (≥1280px) */
    [Sizes.xl]: SizeUnit | FluidUnit;
};

export type OffsetConfig = {
    /** The number of columns to off set this item from left side on extremely small devices (≥360px) */
    [Offsets.xs]: SizeUnit;
    /** The number of columns to off set this item from left side on small devices (≥576px) */
    [Offsets.sm]: SizeUnit;
    /** The number of columns to off set this item from left side on medium devices (≥768px) */
    [Offsets.md]: SizeUnit;
    /** The number of columns to off set this item from left side on large devices (≥992px) */
    [Offsets.lg]: SizeUnit;
    /** The number of columns to off set this item from left side on extremely large devices (≥1280px) */
    [Offsets.xl]: SizeUnit;
};

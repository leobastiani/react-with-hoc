export type ClosurePartial<
  ClosureProps extends {},
  Keys extends readonly string[]
> = {
  [K in keyof ClosureProps as K extends Keys[number]
    ? never
    : K]: ClosureProps[K];
} & {
  [K in keyof ClosureProps as K extends Keys[number]
    ? K
    : never]?: ClosureProps[K];
};

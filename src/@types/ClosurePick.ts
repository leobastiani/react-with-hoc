export type ClosurePick<
  ClosureProps extends {},
  PickNames extends readonly string[]
> = {
  [K in PickNames[number] | keyof ClosureProps as K extends keyof ClosureProps
    ? K extends PickNames[number]
      ? K
      : never
    : never]: K extends keyof ClosureProps ? ClosureProps[K] : never;
};

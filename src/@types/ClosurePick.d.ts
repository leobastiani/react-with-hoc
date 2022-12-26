type ClosurePick<ClosureProps extends {}, PickNames extends string[]> = {
  [K in PickNames[number] | keyof ClosureProps as K extends keyof ClosureProps
    ? K extends PickNames[number]
      ? K
      : never
    : never]: ClosureProps[K];
};

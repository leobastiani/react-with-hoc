export type ClosureOmit<
  ClosureProps extends {},
  OmitNames extends readonly string[]
> = {
  [K in keyof ClosureProps as K extends keyof ClosureProps
    ? K extends OmitNames[number]
      ? never
      : K
    : never]: ClosureProps[K];
};

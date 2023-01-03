export type ClosureRename<
  ClosureProps extends {},
  From extends string,
  To extends string
> = {
  [K in Exclude<keyof ClosureProps | From, To>]: K extends From
    ? To extends keyof ClosureProps
      ? ClosureProps[To]
      : never
    : K extends keyof ClosureProps
    ? ClosureProps[K]
    : never;
};

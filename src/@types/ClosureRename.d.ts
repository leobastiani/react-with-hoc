type ClosureRename<
  ClosureProps extends {},
  From extends string,
  To extends string
> = {
  [K in keyof ClosureProps | From as K extends To ? never : K]: K extends From
    ? To extends keyof ClosureProps
      ? ClosureProps[To]
      : never
    : K extends keyof ClosureProps
    ? ClosureProps[K]
    : never;
};

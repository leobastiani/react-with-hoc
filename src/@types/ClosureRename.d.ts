type ClosureRename<
  ClosureProps extends {},
  From extends string,
  To extends stirng
> = {
  [K in keyof ClosureProps | From as K extends To ? never : K]: K extends From
    ? ClosureProps[To]
    : ClosureProps[K];
};

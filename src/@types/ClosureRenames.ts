export type ClosureRenames<
  ClosureProps extends {},
  Map extends Record<string, string>
> = {
  [K in keyof ClosureProps | keyof Map as K extends Map[keyof Map]
    ? never
    : // @ts-expect-error
      K]: K extends keyof Map ? ClosureProps[Map[K]] : ClosureProps[K];
};

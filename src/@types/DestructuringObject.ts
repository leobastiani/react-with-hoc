export type DestructuringObject<ClosureProps extends {}, Key extends string> = {
  [k in Key]?: Partial<ClosureProps>;
} & Partial<ClosureProps>;

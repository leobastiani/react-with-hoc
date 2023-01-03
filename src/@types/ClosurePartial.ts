export type ClosurePartial<ClosureProps extends {}, Keys extends string> = {
  [K in keyof ClosureProps as K extends Keys ? never : K]: ClosureProps[K];
} & {
  [K in keyof ClosureProps as K extends Keys ? K : never]?: ClosureProps[K];
};

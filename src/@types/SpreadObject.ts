export type SpreadObject<A extends object, B extends object> = B & {
  [K in keyof A as K extends keyof B ? never : K]: A[K];
};

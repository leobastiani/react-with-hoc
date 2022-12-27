type Merge<A, B> = {
  [K in keyof A]: K extends keyof B ? A[K] | B[K] : A[K];
} & {
  [K in keyof B]: K extends keyof A ? A[K] | B[K] : B[K];
};

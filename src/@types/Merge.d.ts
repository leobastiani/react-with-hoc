type Merge<A, B> = {
  [K in keyof (A | B)]: K extends keyof B
    ? K extends keyof A
      ? A[K] | B[K]
      : B[K]
    : A[K];
};

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {};

export interface Fn {
  arg0: unknown;
  return: any;
}

export type Call<MyFn extends Fn, T> = (MyFn & { arg0: T })["return"];

export type Pipe<acc, xs extends Fn[]> = xs extends [
  infer first extends Fn,
  ...infer rest extends Fn[]
]
  ? Pipe<Call<first, acc>, rest>
  : acc;

export interface OmitFn<Name extends string | number | symbol> extends Fn {
  return: Exclude<this["arg0"], [Name, any]>;
}

export interface PickFn<Name extends string | number | symbol> extends Fn {
  return: Extract<this["arg0"], [Name, any]>;
}

export interface IntersectionFn<T extends [string | number | symbol, any]>
  extends Fn {
  return:
    | Exclude<this["arg0"], [T[0], any]>
    | {
        [K in T[0]]: [
          K,
          [K, any] extends this["arg0"]
            ? Extract<this["arg0"], [K, any]>[1] & Extract<T, [K, any]>[1]
            : Extract<T, [K, any]>[1]
        ];
      }[T[0]];
}

export interface UnionFn<T extends [string | number | symbol, any]> extends Fn {
  return: this["arg0"] | T;
}

export interface SetOptionalFn<Names extends string | number | symbol>
  extends Fn {
  return:
    | this["arg0"]
    | {
        [K in Extract<this["arg0"], any[] | [string, never]>[0] & Names]: [
          K,
          Call<PickFn<K>, this["arg0"]> extends [K, never] ? never : undefined
        ];
      }[Extract<this["arg0"], any[] | [string, never]>[0] & Names];
}

export interface ReplaceFn<Props extends [string | number | symbol, any]>
  extends Fn {
  return: Exclude<this["arg0"], [Props[0], any]> | Props;
}

export type PartialOnUndefined<T> = {
  [K in keyof T as undefined extends T[K] ? never : K]: T[K];
} & {
  [K in keyof T as undefined extends T[K] ? K : never]?: T[K];
};

export type FromSchema<T extends [string, any]> = Simplify<
  PartialOnUndefined<{
    [K in T[0]]: Call<PickFn<K>, T>[1];
  }>
>;

export type ToSchema<T> = Exclude<
  {
    [K in keyof T]: [K, T[K]];
  }[keyof T],
  undefined
>;

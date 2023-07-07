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

export interface IntersectionObjectFn<MyObject extends {}> extends Fn {
  return: {
    [Name in
      | Extract<this["arg0"], any[]>[0]
      | keyof MyObject]: Name extends Extract<this["arg0"], any[]>[0]
      ? Name extends keyof MyObject
        ? [Name, MyObject[Name] & Extract<this["arg0"], [Name, any]>[1]]
        : Extract<this["arg0"], [Name, any]>
      : [Name, MyObject[Name]];
  }[Extract<this["arg0"], any[]>[0] | keyof MyObject];
}

export interface OmitFn<Name extends string> extends Fn {
  return: Exclude<this["arg0"], [Name, any]>;
}

export interface PickFn<Name extends string> extends Fn {
  return: Extract<this["arg0"], [Name, any]>;
}

export interface IntersectionFn<Name extends string, MyType> extends Fn {
  return: Name extends Extract<this["arg0"], Array<any>>[0]
    ?
        | Exclude<this["arg0"], [Name, any]>
        | [Name, MyType & Extract<this["arg0"], [Name, any]>[1]]
    : this["arg0"] | [Name, MyType];
}

export interface UnionFn<T extends [string, any]> extends Fn {
  return: this["arg0"] | T;
}

export interface SetOptionalFn<Names extends string[]> extends Fn {
  return:
    | this["arg0"]
    | {
        [K in Names[number]]: [
          K,
          Call<PickFn<K>, this["arg0"]> extends [K, never] ? never : undefined
        ];
      }[Names[number]];
}

export interface ReplaceFn<Name extends string, MyType> extends Fn {
  return: Name extends Extract<this["arg0"], Array<any>>[0]
    ? Exclude<this["arg0"], [Name, any]> | [Name, MyType]
    : this["arg0"] | [Name, MyType];
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

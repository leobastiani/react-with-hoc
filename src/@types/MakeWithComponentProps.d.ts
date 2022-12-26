import { ReactNode } from "react";

// credits goes to https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type/50375286#50375286
type UnionToIntersection<U extends string> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;

// credits goes to https://github.com/microsoft/TypeScript/issues/13298#issuecomment-468114901
type UnionToOvlds<U extends string> = UnionToIntersection<
  U extends any ? (f: U) => void : never
>;

type PopUnion<U extends string> = UnionToOvlds<U> extends (a: infer A) => void
  ? A
  : never;

// credits goes to https://stackoverflow.com/questions/53953814/typescript-check-if-a-type-is-a-union#comment-94748994
type IsUnion<T extends string> = [T] extends readonly [UnionToIntersection<T>]
  ? false
  : true;

type UnionToArray<
  T extends string,
  A extends readonly string[] = []
> = IsUnion<T> extends true
  ? readonly UnionToArray<Exclude<T, PopUnion<T>>, [PopUnion<T>, ...A]>
  : readonly [T, ...A];

type MakeWithComponentProps<
  ClosureProps extends {},
  Options extends {},
  ComponentKey = Exclude<
    Extract<keyof Options, string>,
    "hiddenByDefault" | "pick" | "omit"
  >
> = {
  [K in keyof ClosureProps as K extends ComponentKey
    ? never
    : K]: ClosureProps[K];
} & {
  [K in ComponentKey]?:
    | ((Component: Options[K]) => (props: ClosureProps) => ReactNode)
    | ReactNode;
};

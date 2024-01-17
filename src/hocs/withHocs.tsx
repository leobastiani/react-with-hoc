import { ComponentType } from "react";
import { Fn } from "../types/Fn";
import { Hoc } from "../types/Hoc";

type WithHocsArg =
  | Hoc<any>
  | ((Component: ComponentType<any>) => ComponentType<any>);

type WithHocsFlat<
  Hocs extends WithHocsArg[],
  Acc extends Fn[] = [],
> = Hocs extends [infer first, ...infer rest extends WithHocsArg[]]
  ? first extends Hoc<infer Fns extends Fn[]>
    ? WithHocsFlat<rest, [...Acc, ...Fns]>
    : WithHocsFlat<rest, Acc>
  : Acc;

/**
 * Apply multiple hocs
 *
 *  @example
 * const NewComponent = withHocs([withWrapper(A), withWrapper(B)])(MyComponent)
 * <A>
 *   <B>
 *     <NewComponent ... />
 *   </B>
 * </A>
 *
 * @example
 * const MyComponent = (() => {
 *   function MyComponent(props: { ... }) {
 *     return <OtherComponents />;
 *   }
 *   return withHocs([ ... ])(MyComponent);
 * })();
 *
 * @example
 * import { withHoc1, withHoc1 } from 'my-hocs'
 * // `withHoc1_2` can be used somewhere else
 * export const withHoc1_2 = withHocs([withHoc1, withHoc2])
 */
export function withHocs<const Hocs extends readonly WithHocsArg[]>(
  hocs: Hocs,
): Hoc<WithHocsFlat<[...Hocs]>> {
  return (arg: any) =>
    hocs.reduceRight((Component, hoc) => hoc(Component), arg);
}

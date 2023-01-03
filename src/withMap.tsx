import { ComponentType, FunctionComponent, Key } from "react";
import { ClosurePartial } from "./@types/ClosurePartial";
import { NormalizeObject } from "./@types/NormalizeObject";
import { newHocNamedWithProps } from "./newHoc";

interface Options<
  IndexName extends string,
  ValueName extends string,
  Props extends {}
> {
  indexName?: IndexName;
  valueName?: ValueName;
  key: (props: Props) => Key;
}

interface WithMapHoc {
  <
    Props extends {},
    IndexName extends string = "i",
    ValueName extends string = "children"
  >(
    target: number | Array<unknown> | object,
    options?: Options<IndexName, ValueName, Props>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<
    NormalizeObject<ClosurePartial<ClosureProps, [IndexName, ValueName]>>
  >;
}

export const withMap = ((): WithMapHoc => {
  function withMap(
    Component: ComponentType,
    target: number | Array<unknown> | object | string,
    {
      indexName = "i",
      key = (props: any): Key => props[indexName],
      valueName = "children",
    } = {}
  ): FunctionComponent {
    function WithMap(props: any): JSX.Element {
      let ret;
      if (typeof target === "number") {
        ret = Array.from({ length: target }).map((_v, i) => (
          <Component
            key={key({ ...props, [indexName]: i })}
            {...{ ...props, [indexName]: i }}
          />
        ));
      } else if (typeof target === "string") {
        throw "Not implemented";
      } else if (Array.isArray(target)) {
        if (target.length > 0 && typeof target[0] != "object") {
          ret = target.map((v, i) => (
            <Component
              key={key({ ...props, [indexName]: i, [valueName]: v })}
              {...{ ...props, [indexName]: i, [valueName]: v }}
            />
          ));
        } else {
          ret = target.map((v, i) => (
            <Component
              key={key({ ...props, [indexName]: i })}
              {...{ [valueName]: v, ...v, ...props, [indexName]: i }}
            />
          ));
        }
      } else {
        // object
        ret = Object.entries(target).map(([index, value]) => (
          <Component
            key={key({ ...props, [indexName]: index })}
            {...{ [valueName]: value, ...props, [indexName]: index }}
          />
        ));
      }

      return <>{ret}</>;
    }
    return WithMap;
  }

  return newHocNamedWithProps(withMap) as WithMapHoc;
})();

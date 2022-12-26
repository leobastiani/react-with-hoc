import { ComponentType, FunctionComponent, Key } from "react";
import { newHocNamedWithProps } from "./newHoc";

interface Options<IndexName extends string> {
  indexName?: IndexName;
}

interface WithMapHoc {
  <Props extends {}, IndexName extends string = "i">(
    target: number | Array<unknown> | object,
    options?: Options<IndexName>
  ): <ClosureProps extends Props>(
    Component: ComponentType<ClosureProps>
  ) => FunctionComponent<ClosureOmit<ClosureProps, [IndexName]>>;
}

export const withMap = ((): WithMapHoc => {
  function withMap(
    Component: ComponentType,
    target: number | Array<unknown> | object | string,
    { indexName = "i", key = (props: any): Key => props[indexName] } = {}
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
              key={key({ ...props, [indexName]: i, children: v })}
              {...{ ...props, [indexName]: i }}
            >
              {v}
            </Component>
          ));
        } else {
          ret = target.map((v, i) => (
            <Component
              key={key({ ...props, [indexName]: i })}
              {...{ children: v, ...v, ...props, [indexName]: i }}
            />
          ));
        }
      } else {
        // object
        ret = Object.entries(target).map(([index, value]) => (
          <Component
            key={key({ ...props, [indexName]: index })}
            {...{ children: value, ...props, [indexName]: index }}
          />
        ));
      }

      return <>{ret}</>;
    }
    return WithMap;
  }

  return newHocNamedWithProps(withMap) as WithMapHoc;
})();

// https://github.com/microsoft/TypeScript/issues/52010

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsIn10 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsIn10>,
  hoc10: (Component: React.ComponentType<PropsIn10>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsIn10 extends {}, PropsIn11 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsIn10>,
  hoc10: (Component: React.ComponentType<PropsIn10>) => React.FunctionComponent<PropsIn11>,
  hoc11: (Component: React.ComponentType<PropsIn11>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsIn10 extends {}, PropsIn11 extends {}, PropsIn12 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsIn10>,
  hoc10: (Component: React.ComponentType<PropsIn10>) => React.FunctionComponent<PropsIn11>,
  hoc11: (Component: React.ComponentType<PropsIn11>) => React.FunctionComponent<PropsIn12>,
  hoc12: (Component: React.ComponentType<PropsIn12>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsIn10 extends {}, PropsIn11 extends {}, PropsIn12 extends {}, PropsIn13 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsIn10>,
  hoc10: (Component: React.ComponentType<PropsIn10>) => React.FunctionComponent<PropsIn11>,
  hoc11: (Component: React.ComponentType<PropsIn11>) => React.FunctionComponent<PropsIn12>,
  hoc12: (Component: React.ComponentType<PropsIn12>) => React.FunctionComponent<PropsIn13>,
  hoc13: (Component: React.ComponentType<PropsIn13>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsIn10 extends {}, PropsIn11 extends {}, PropsIn12 extends {}, PropsIn13 extends {}, PropsIn14 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsIn10>,
  hoc10: (Component: React.ComponentType<PropsIn10>) => React.FunctionComponent<PropsIn11>,
  hoc11: (Component: React.ComponentType<PropsIn11>) => React.FunctionComponent<PropsIn12>,
  hoc12: (Component: React.ComponentType<PropsIn12>) => React.FunctionComponent<PropsIn13>,
  hoc13: (Component: React.ComponentType<PropsIn13>) => React.FunctionComponent<PropsIn14>,
  hoc14: (Component: React.ComponentType<PropsIn14>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

// prettier-ignore
export function withHocs<PropsIn0 extends {}, PropsIn1 extends {}, PropsIn2 extends {}, PropsIn3 extends {}, PropsIn4 extends {}, PropsIn5 extends {}, PropsIn6 extends {}, PropsIn7 extends {}, PropsIn8 extends {}, PropsIn9 extends {}, PropsIn10 extends {}, PropsIn11 extends {}, PropsIn12 extends {}, PropsIn13 extends {}, PropsIn14 extends {}, PropsIn15 extends {}, PropsOut extends {}>(
  hoc0: (Component: React.ComponentType<PropsIn0>) => React.FunctionComponent<PropsIn1>,
  hoc1: (Component: React.ComponentType<PropsIn1>) => React.FunctionComponent<PropsIn2>,
  hoc2: (Component: React.ComponentType<PropsIn2>) => React.FunctionComponent<PropsIn3>,
  hoc3: (Component: React.ComponentType<PropsIn3>) => React.FunctionComponent<PropsIn4>,
  hoc4: (Component: React.ComponentType<PropsIn4>) => React.FunctionComponent<PropsIn5>,
  hoc5: (Component: React.ComponentType<PropsIn5>) => React.FunctionComponent<PropsIn6>,
  hoc6: (Component: React.ComponentType<PropsIn6>) => React.FunctionComponent<PropsIn7>,
  hoc7: (Component: React.ComponentType<PropsIn7>) => React.FunctionComponent<PropsIn8>,
  hoc8: (Component: React.ComponentType<PropsIn8>) => React.FunctionComponent<PropsIn9>,
  hoc9: (Component: React.ComponentType<PropsIn9>) => React.FunctionComponent<PropsIn10>,
  hoc10: (Component: React.ComponentType<PropsIn10>) => React.FunctionComponent<PropsIn11>,
  hoc11: (Component: React.ComponentType<PropsIn11>) => React.FunctionComponent<PropsIn12>,
  hoc12: (Component: React.ComponentType<PropsIn12>) => React.FunctionComponent<PropsIn13>,
  hoc13: (Component: React.ComponentType<PropsIn13>) => React.FunctionComponent<PropsIn14>,
  hoc14: (Component: React.ComponentType<PropsIn14>) => React.FunctionComponent<PropsIn15>,
  hoc15: (Component: React.ComponentType<PropsIn15>) => React.FunctionComponent<PropsOut>,
): (Component: React.ComponentType<PropsIn0>) => React.ComponentType<PropsOut>;

export function withHocs(...fns: any): any {
  // @ts-ignore
  return (arg: any) => fns.reduceRight((acc, fn) => fn(acc), arg);
}

import { isEmpty } from "./isEmpty";

export function combineProps(
  prop0: { [key: string]: any },
  prop1: { [key: string]: any }
) {
  const style = Object.assign({}, prop0.style, prop1.style);
  const className = (() => {
    if (!prop0.className && !prop1.className) {
      return [];
    } else if (prop0.className && prop1.className) {
      return Array.from(
        new Set([...prop0.className, ...prop1.className])
      ).filter(Boolean);
    } else if (prop0.className) {
      return prop0.className;
    } else if (prop1.className) {
      return prop1.className;
    }
    return [];
  })();
  const ret: any = Object.assign({}, prop0, prop1);
  if (!isEmpty(style)) {
    ret.style = style;
  } else if ("style" in ret) {
    delete ret.style;
  }
  if (!isEmpty(className)) {
    ret.className = className;
  } else if ("className" in ret) {
    delete ret.className;
  }
  return ret;
}

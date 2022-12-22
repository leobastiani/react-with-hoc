export function isEmpty(obj: object | Array<any>) {
  if (Array.isArray(obj)) {
    return !obj.length;
  }
  for (const _ in obj) {
    return false;
  }
  return true;
}

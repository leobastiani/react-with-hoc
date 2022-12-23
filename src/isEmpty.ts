export function isEmpty(obj: object | Array<any>): boolean {
  if (Array.isArray(obj)) {
    return !obj.length;
  }
  for (const _ in obj) {
    return false;
  }
  return true;
}

export function camelCase(text: string | string[]): string {
  if (Array.isArray(text)) {
    let ret = "";
    for (let i = 0; i < text.length; i++) {
      ret +=
        (i == 0
          ? text[i].charAt(0).toLocaleLowerCase()
          : text[i].charAt(0).toUpperCase()) + text[i].slice(1);
    }
    return ret;
  }

  const a = text
    .toLowerCase()
    .replace(/[-_\s.]+(.)?/g, (_, c: string) =>
      c ? c.toLocaleUpperCase() : ""
    );
  return a.substring(0, 1).toLowerCase() + a.substring(1);
}

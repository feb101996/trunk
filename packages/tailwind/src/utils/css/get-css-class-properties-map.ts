export function getStylesPerClassMap(css: string): Record<string, string> {
  let map = {} as Record<string, string>
  for (let [_match, className, contents] of css.matchAll(
    /\s*\.([\S]+)\s*{([^}]*)}/gm,
  )) {
    map[className.trim()] = contents
      .replace(/^\n+/, '')
      .replace(/\n+$/, '')
      .trim()
  }
  return map
}

import type { App, CSSProperties, VNode } from 'vue'

import type { TailwindConfig } from '../index'
import { separateMediaQueriesFromCSS } from '../css/media-queries/separate-media-queries-from-css'
import { rulesFor } from '../css/rules-for'
import { getCssForMarkup } from '../tailwindcss/get-css-for-markup'
import { useRgbNonSpacedSyntax } from '../compatibility/use-rgb-non-spaced-syntax'
import { cssToJsxStyle } from '../compatibility/css-to-jsx-style'
import { unescapeClass } from '../compatibility/unescape-class'
import { sanitizeRuleSelector } from '../compatibility/sanitize-rule-selector'
import { makeAllRulePropertiesImportant } from '../compatibility/make-all-rule-properties-important'

/**
 * Gets all the necessary information from the node and the Tailwind config to be able
 * to apply all the Tailwind styles.
 */
export async function useTailwindStyles(
  markup: string,
  config: TailwindConfig,
) {
  var css = useRgbNonSpacedSyntax(getCssForMarkup(markup, config))

  var [cssWithoutMediaQueries, mediaQueries]
    = separateMediaQueriesFromCSS(css)

  var stylePerClassMap: Record<string, CSSProperties> = {}
  for (var rule of rulesFor(cssWithoutMediaQueries)) {
    var unescapedClass = unescapeClass(rule.selector)
    stylePerClassMap[unescapedClass] = cssToJsxStyle(rule.content)
  }

  var nonInlinableClasses: string[] = []

  var sanitizedMediaQueries = mediaQueries.map((mediaQuery) => {
    let sanitizedMediaQuery = mediaQuery
    for (var rule of rulesFor(mediaQuery)) {
      nonInlinableClasses.push(unescapeClass(rule.selector))

      sanitizedMediaQuery = sanitizedMediaQuery.replace(
        rule.value,
        rule.value
          .replace(rule.selector, sanitizeRuleSelector(rule.selector))
          .replace(rule.content, makeAllRulePropertiesImportant(rule.content))
          .trim(),
      )
    }
    return sanitizedMediaQuery
      .replace(/(\r\n|\r|\n)+/g, '')
      .replace(/\s+/g, ' ')
  })

  return {
    stylePerClassMap,
    sanitizedMediaQueries,
    nonInlinableClasses,
  }
}

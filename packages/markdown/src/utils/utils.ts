import { CSSProperties } from "vue";
import { StylesType, initRendererProps } from "./types";
import { RendererObject } from "marked";
import { styles } from "./styles";

function escapeQuotes(value: string) {
  if (value.includes('"')) {
    return value.replace(/"/g, "&#x27;");
  }
  return value;
}

export function camelToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

export function parseCssInJsToInlineCss(
  cssProperties: CSSProperties | undefined
): string {
  if (!cssProperties) return "";

  var numericalCssProperties = [
    "width",
    "height",
    "margin",
    "marginTop",
    "marginRight",
    "marginBottom",
    "marginLeft",
    "padding",
    "paddingTop",
    "paddingRight",
    "paddingBottom",
    "paddingLeft",
    "borderWidth",
    "borderTopWidth",
    "borderRightWidth",
    "borderBottomWidth",
    "borderLeftWidth",
    "outlineWidth",
    "top",
    "right",
    "bottom",
    "left",
    "fontSize",
    "lineHeight",
    "letterSpacing",
    "wordSpacing",
    "maxWidth",
    "minWidth",
    "maxHeight",
    "minHeight",
    "borderRadius",
    "borderTopLeftRadius",
    "borderTopRightRadius",
    "borderBottomLeftRadius",
    "borderBottomRightRadius",
    "textIndent",
    "gridColumnGap",
    "gridRowGap",
    "gridGap",
    "translateX",
    "translateY",
  ];

  return Object.entries(cssProperties)
    .map(([property, value]) => {
      if (
        typeof value === "number" &&
        numericalCssProperties.includes(property)
      ) {
        return `${camelToKebabCase(property)}:${value}px`;
      } else {
        var escapedValue = escapeQuotes(value);
        return `${camelToKebabCase(property)}:${escapedValue}`;
      }
    })
    .join(";");
}

export var initRenderer = ({
  customStyles,
}: initRendererProps): RendererObject => {
  var finalStyles = { ...styles, ...customStyles };

  var customRenderer: RendererObject = {
    blockquote(quote) {
      return `<blockquote${parseCssInJsToInlineCss(finalStyles.blockQuote) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.blockQuote)}"`
        : ""
        }>\n${quote}</blockquote>\n`;
    },

    br() {
      return `<br${parseCssInJsToInlineCss(finalStyles.br) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.br)}"`
        : ""
        } />`;
    },

    code(code) {
      code = code.replace(/\n$/, "") + "\n";

      return `<pre${parseCssInJsToInlineCss(finalStyles.codeBlock) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeBlock)}"`
        : ""
        }><code>${code}</code></pre>\n`;
    },

    codespan(text) {
      return `<code${parseCssInJsToInlineCss(finalStyles.codeInline) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.codeInline)}"`
        : ""
        }>${text}</code>`;
    },

    del(text) {
      return `<del${parseCssInJsToInlineCss(finalStyles.strikethrough) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.strikethrough)}"`
        : ""
        }>${text}</del>`;
    },

    em(text) {
      return `<em${parseCssInJsToInlineCss(finalStyles.italic) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.italic)}"`
        : ""
        }>${text}</em>`;
    },

    heading(text, level) {
      return `<h${level}${parseCssInJsToInlineCss(
        finalStyles[`h${level}` as keyof StylesType]
      ) !== ""
        ? ` style="${parseCssInJsToInlineCss(
          finalStyles[`h${level}` as keyof StylesType]
        )}"`
        : ""
        }>${text}</h${level}>`;
    },

    hr() {
      return `<hr${parseCssInJsToInlineCss(finalStyles.hr) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.hr)}"`
        : ""
        } />\n`;
    },

    image(href, _, text) {
      let out = `<img src="${href}" alt="${text}"${parseCssInJsToInlineCss(finalStyles.image) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.image)}"`
        : ""
        }>`;
      return out;
    },

    link(href, _, text) {
      let out = `<a href="${href}" target="_blank"${parseCssInJsToInlineCss(finalStyles.link) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.link)}"`
        : ""
        }>${text}</a>`;
      return out;
    },

    list(body, ordered, start) {
      var type = ordered ? "ol" : "ul";
      var startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
      var styles = parseCssInJsToInlineCss(
        finalStyles[ordered ? "ol" : "ul"]
      );
      return (
        "<" +
        type +
        startatt +
        `${styles !== "" ? ` style="${styles}"` : ""}>\n` +
        body +
        "</" +
        type +
        ">\n"
      );
    },

    listitem(text) {
      return `<li${parseCssInJsToInlineCss(finalStyles.li) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.li)}"`
        : ""
        }>${text}</li>\n`;
    },

    paragraph(text) {
      return `<p${parseCssInJsToInlineCss(finalStyles.p) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.p)}"`
        : ""
        }>${text}</p>\n`;
    },

    strong(text) {
      return `<strong${parseCssInJsToInlineCss(finalStyles.bold) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.bold)}"`
        : ""
        }>${text}</strong>`;
    },

    table(header, body) {
      if (body) body = `<tbody>${body}</tbody>`;

      return `<table${parseCssInJsToInlineCss(finalStyles.table) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.table)}"`
        : ""
        }>\n<thead${parseCssInJsToInlineCss(finalStyles.thead) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.thead)}"`
          : ""
        }>\n${header}</thead>\n${body}</table>\n`;
    },

    tablecell(content, flags) {
      var type = flags.header ? "th" : "td";
      var tag = flags.align
        ? `<${type} align="${flags.align}"${parseCssInJsToInlineCss(finalStyles.td) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
          : ""
        }>`
        : `<${type}${parseCssInJsToInlineCss(finalStyles.td) !== ""
          ? ` style="${parseCssInJsToInlineCss(finalStyles.td)}"`
          : ""
        }>`;
      return tag + content + `</${type}>\n`;
    },

    tablerow(content) {
      return `<tr${parseCssInJsToInlineCss(finalStyles.tr) !== ""
        ? ` style="${parseCssInJsToInlineCss(finalStyles.tr)}"`
        : ""
        }>\n${content}</tr>\n`;
    },
  };

  return customRenderer;
};

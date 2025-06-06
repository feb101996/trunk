import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Markdown } from "./index";

describe("<Markdown> component", () => {
  it("renders the markdown in the correct format for browsers", async () => {
    let component = h(Markdown, {
      source: `# Markdown Test Document

This is a **test document** to check the capabilities of a Markdown parser.

## Headings

### Third-Level Heading

#### Fourth-Level Heading

##### Fifth-Level Heading

###### Sixth-Level Heading

## Text Formatting

This is some **bold text** and this is some *italic text*. You can also use ~~strikethrough~~ and \`inline code\`.

## Lists

1. Ordered List Item 1
2. Ordered List Item 2
3. Ordered List Item 3

- Unordered List Item 1
- Unordered List Item 2
- Unordered List Item 3

## Links

[Markdown Guide](https://www.markdownguide.org)

## Images

![Markdown Logo](https://markdown-here.com/img/icon256.png)

## Blockquotes

> This is a blockquote.
> - Author

## Code Blocks

\`\`\`javascript
function greet(name) {
console.log(\`Hello, $\{name}!\`);
}
\`\`\``
    })

    let actualOutput = await render(component)

    expect(actualOutput).toMatchSnapshot();
  });

  it("renders the headers in the correct format for browsers", () => {
    let actualOutput = render(h(Markdown, {
      source: `
# Heading 1!
## Heading 2!
### Heading 3!
#### Heading 4!
##### Heading 5!
###### Heading 6!
       `
    }));

    expect(actualOutput).toMatchSnapshot();
  });

  it("renders text in the correct format for browsers", () => {


    let actualOutput = render(h(Markdown, {
      markdownCustomStyles: {
        bold: {
          font: '700 23px / 32px "Roobert PRO", system-ui, sans-serif',
          background: 'url("path/to/image")',
        },
      },
    }, [
      '**This is sample bold text in markdown** and *this is italic text*'
    ])
    );
    expect(actualOutput).toMatchSnapshot();
  });

  it("renders links in the correct format for browsers", () => {
    let actualOutput = render(h(Markdown, [
      'Link to [React-email](https://react.email)'
    ]));
    expect(actualOutput).toMatchSnapshot();
  });

  it("renders lists in the correct format for browsers", () => {
    let actualOutput = render(h(Markdown, [
      `
# Below is a list 

- Item One
- Item Two
- Item Three
       `
    ]));

    expect(actualOutput).toMatchSnapshot();
  });

})

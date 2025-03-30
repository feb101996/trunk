import { StylesType } from "./types";

let emptyStyle = {};

let baseHeaderStyles = {
  fontWeight: "500",
  paddingTop: 20,
};

let h1 = {
  ...baseHeaderStyles,
  fontSize: "2.5rem",
};

let h2 = {
  ...baseHeaderStyles,
  fontSize: "2rem",
};
let h3 = {
  ...baseHeaderStyles,
  fontSize: "1.75rem",
};
let h4 = {
  ...baseHeaderStyles,
  fontSize: "1.5rem",
};
let h5 = {
  ...baseHeaderStyles,
  fontSize: "1.25rem",
};
let h6 = {
  ...baseHeaderStyles,
  fontSize: "1rem",
};

let bold = {
  fontWeight: "bold",
};

let italic = {
  fontStyle: "italic",
};

let blockQuote = {
  background: "#f9f9f9",
  borderLeft: "10px solid #ccc",
  margin: "1.5em 10px",
  padding: "1em 10px",
};

let codeInline = {
  color: "#212529",
  fontSize: "87.5%",
  display: "inline",
  background: " #f8f8f8",
  fontFamily: `SFMono-Regular,Menlo,Monaco,Consolas,monospace`,
};

let codeBlock = {
  ...codeInline,
  paddingTop: 10,
  paddingRight: 10,
  paddingLeft: 10,
  paddingBottom: 1,
  marginBottom: 20,
  background: " #f8f8f8",
};

let link = {
  color: "#007bff",
  textDecoration: "underline",
  backgroundColor: "transparent",
};

export let styles: StylesType = {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  blockQuote,
  bold,
  italic,
  link,
  codeBlock: { ...codeBlock, wordWrap: "break-word" },
  codeInline: { ...codeInline, wordWrap: "break-word" },
  p: emptyStyle,
  li: emptyStyle,
  ul: emptyStyle,
  ol: emptyStyle,
  image: emptyStyle,
  br: emptyStyle,
  hr: emptyStyle,
  table: emptyStyle,
  thead: emptyStyle,
  tbody: emptyStyle,
  th: emptyStyle,
  td: emptyStyle,
  tr: emptyStyle,
  strikethrough: emptyStyle,
};

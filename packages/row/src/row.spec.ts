import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Row } from "./index";

describe("<Row> component", () => {
  it("renders children correctly", async () => {
    let testMessage = "Test message";
    let component = h(Row, [
      testMessage
    ])
    let html = await render(component)
    expect(html).toContain(testMessage)
  });
})

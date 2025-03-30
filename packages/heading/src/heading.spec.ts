import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Heading } from "./index";

describe("<Heading> component", () => {
  it("renders children correctly", async () => {
    let testMessage = "Test message";
    let component = h(Heading, [
      testMessage
    ])
    let html = await render(component)
    expect(html).toContain(testMessage)
  });
})

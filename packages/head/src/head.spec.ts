import { describe, expect, it } from 'vitest'
import { h } from 'vue'
import { render } from "@vue-email/render";
import { Head } from "./index";

describe("<Head> component", () => {
  it("renders children correctly", async () => {
    let testMessage = "Test message";
    let component = h(Head, [
      testMessage
    ])
    let html = await render(component)
    expect(html).toContain(testMessage)
  });
})

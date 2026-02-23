import type { MDXComponents } from "mdx/types"
import type { ComponentPropsWithoutRef } from "react"

import { GlossaryTooltip } from "@/components/content/glossary-tooltip"
import { ExampleBlock } from "@/components/content/example-block"
import { DisclaimerBanner } from "@/components/content/disclaimer-banner"
import { ReadingTime } from "@/components/content/reading-time"
import { TableOfContents } from "@/components/content/table-of-contents"
import { slugify, textContent } from "@/lib/utils"

function H2(props: ComponentPropsWithoutRef<"h2">) {
  const id = props.id ?? slugify(textContent(props.children))
  return <h2 {...props} id={id} />
}

function H3(props: ComponentPropsWithoutRef<"h3">) {
  const id = props.id ?? slugify(textContent(props.children))
  return <h3 {...props} id={id} />
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h2: H2,
    h3: H3,
    GlossaryTooltip,
    ExampleBlock,
    DisclaimerBanner,
    ReadingTime,
    TableOfContents,
  }
}

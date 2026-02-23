import type { MDXComponents } from "mdx/types"
import { GlossaryTooltip } from "@/components/content/glossary-tooltip"
import { ExampleBlock } from "@/components/content/example-block"
import { DisclaimerBanner } from "@/components/content/disclaimer-banner"
import { ReadingTime } from "@/components/content/reading-time"
import { TableOfContents } from "@/components/content/table-of-contents"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    GlossaryTooltip,
    ExampleBlock,
    DisclaimerBanner,
    ReadingTime,
    TableOfContents,
  }
}

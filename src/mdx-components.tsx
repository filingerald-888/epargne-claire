import type { MDXComponents } from "mdx/types"
import { GlossaryTooltip } from "@/components/content/glossary-tooltip"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    GlossaryTooltip,
  }
}

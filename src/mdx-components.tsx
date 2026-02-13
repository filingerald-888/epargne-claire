import type { MDXComponents } from "mdx/types"

// Mapping vide — les composants content/ seront ajoutés en Story 2.1+
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}

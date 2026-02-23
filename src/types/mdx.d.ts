declare module '*.mdx' {
  import type { ComponentType } from 'react'
  import type { ProductFrontmatter } from '@/types/product'

  const MDXComponent: ComponentType
  export default MDXComponent
  export const frontmatter: ProductFrontmatter
}

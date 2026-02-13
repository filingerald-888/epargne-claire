export interface NavItem {
  label: string
  href: string
}

export interface ContextualLink {
  label: string
  href: string
  type: "next" | "compare" | "related"
}

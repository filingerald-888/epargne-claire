import { createElement, Fragment, type ReactNode } from "react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Extract text content from React children recursively */
export function textContent(children: ReactNode): string {
  if (typeof children === "string") return children
  if (typeof children === "number") return String(children)
  if (Array.isArray(children)) return children.map(textContent).join("")
  if (children && typeof children === "object" && "props" in children) {
    return textContent((children as { props: { children?: ReactNode } }).props.children)
  }
  return ""
}

/** Render **bold** markers inside a string as <strong> elements */
export function renderBold(text: ReactNode): ReactNode {
  if (typeof text !== 'string') return text
  const parts = text.split(/\*\*(.*?)\*\*/g)
  if (parts.length === 1) return text
  return createElement(
    Fragment,
    null,
    ...parts.map((part, i) =>
      i % 2 === 1
        ? createElement('strong', { key: i, className: 'font-semibold text-ep-text-primary' }, part)
        : part
    )
  )
}

/** Generate a URL-friendly slug from text (handles French accents) */
export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

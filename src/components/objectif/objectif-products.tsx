'use client'

import { ArrowRight } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import { cn } from '@/lib/utils'

const tagColors: Record<string, { bg: string; text: string }> = {
  securiser: { bg: 'bg-securiser-bg', text: 'text-securiser-text' },
  projets: { bg: 'bg-projets-bg', text: 'text-projets-text' },
  retraite: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
  transmission: { bg: 'bg-transmission-bg', text: 'text-transmission-text' },
  actions: { bg: 'bg-projets-bg', text: 'text-projets-text' },
  longterme: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
  flexible: { bg: 'bg-projets-bg', text: 'text-projets-text' },
  deductible: { bg: 'bg-retraite-bg', text: 'text-retraite-text' },
}

interface ObjectifProduct {
  title: string
  description: string
  image: string
  tags: { label: string; colorKey: string }[]
  href: string
}

interface ObjectifProductsProps {
  products: ObjectifProduct[]
}

export function ObjectifProducts({ products }: ObjectifProductsProps) {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products.map((product) => (
        <motion.div key={product.href} variants={itemVariants}>
          <Link
            href={product.href}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ep-separator bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]"
          >
            {/* Image */}
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src={product.image}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-bold text-ep-text-primary">
                {product.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ep-text-muted">
                {product.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {product.tags.map((tag) => {
                  const tc = tagColors[tag.colorKey]
                  return (
                    <span
                      key={tag.label}
                      className={cn(
                        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                        tc?.bg ?? 'bg-ep-bg-blue-subtle',
                        tc?.text ?? 'text-ep-primary'
                      )}
                    >
                      {tag.label}
                    </span>
                  )
                })}
              </div>

              {/* Arrow */}
              <div className="mt-4 flex justify-end">
                <span className="inline-flex size-8 items-center justify-center rounded-full text-gray-700 transition-all duration-200 group-hover:bg-gray-700 group-hover:text-white">
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  )
}

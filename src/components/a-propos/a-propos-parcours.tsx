'use client'

import { Award, Briefcase, Globe, GraduationCap, Linkedin, Mail, Phone } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import Image from 'next/image'

import {
  fadeInVariants,
  reducedFadeInVariants,
  staggerContainerVariants,
} from '@/lib/motion'
import {
  certifications,
  diplomas,
  experiences,
  languages,
  skills,
  topSkills,
} from '@/lib/a-propos-data'

import { ProductSection } from '@/components/content/product-section'
import { StrongPhrase } from '@/components/product/strong-phrase'

export function AProposParcours() {
  const prefersReduced = useReducedMotion()
  const itemVariants = prefersReduced ? reducedFadeInVariants : fadeInVariants

  return (
    <ProductSection background="primary-subtle">
      {/* Portrait arrondi */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-6 flex justify-center"
      >
        <div className="relative size-28 overflow-hidden rounded-full border-4 border-white shadow-lg md:size-32">
          <Image
            src="/images/fondateur-v2.jpg"
            alt="Gérald, fondateur d'EpargneClaire"
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>
      </motion.div>

      <StrongPhrase
        title="Parcours"
        subtitle="13 ans de Product Management"
      />

      {/* Contact */}
      <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-12 flex flex-wrap items-center justify-center gap-4 text-sm"
      >
        <a
          href="tel:+33699169478"
          className="inline-flex items-center gap-2 rounded-full border border-ep-separator bg-white px-4 py-2 text-ep-text-primary transition-colors hover:border-ep-primary hover:text-ep-primary"
        >
          <Phone className="size-4 text-ep-primary" strokeWidth={1.5} />
          06 99 16 94 78
        </a>
        <a
          href="mailto:filingerald@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-ep-separator bg-white px-4 py-2 text-ep-text-primary transition-colors hover:border-ep-primary hover:text-ep-primary"
        >
          <Mail className="size-4 text-ep-primary" strokeWidth={1.5} />
          filingerald@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/gerald-filin/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-ep-separator bg-white px-4 py-2 text-ep-text-primary transition-colors hover:border-ep-primary hover:text-ep-primary"
        >
          <Linkedin className="size-4 text-ep-primary" strokeWidth={1.5} />
          LinkedIn
        </a>
      </motion.div>

      {/* Timeline — Expériences */}
      <motion.div
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {experiences.map((exp, i) => {
          const isLast = i === experiences.length - 1
          return (
            <motion.div
              key={exp.period}
              variants={itemVariants}
              className="flex gap-4"
            >
              {/* Dot + line segments */}
              <div className="flex flex-col items-center">
                {i === 0 ? (
                  <div className="h-[3px] shrink-0" />
                ) : (
                  <div className="h-[3px] w-0.5 shrink-0 bg-ep-primary/30" />
                )}
                <div className="size-3 shrink-0 rounded-full bg-ep-primary" />
                {!isLast && <div className="w-0.5 flex-1 bg-ep-primary/30" />}
              </div>

              {/* Content */}
              <div className={isLast ? undefined : 'pb-8'}>
                <p className="text-xs font-medium uppercase tracking-wider text-ep-text-muted">
                  {exp.period}
                </p>
                <p className="mt-1 text-base font-bold text-ep-text-primary">
                  {exp.role}
                </p>
                <p className="mt-0.5 text-sm text-ep-primary">{exp.company}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Compétences */}
      <div className="mt-16">
        <motion.h3
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-ep-text-primary"
        >
          <Briefcase className="size-6 text-ep-primary" strokeWidth={1.5} aria-hidden />
          Compétences
        </motion.h3>
        {/* Top 3 compétences clés */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-6 rounded-xl border border-ep-primary/20 bg-ep-primary/5 p-5"
        >
          <p className="mb-3 text-sm font-bold text-ep-primary">
            Top 3 compétences clés
          </p>
          <ul className="space-y-2">
            {topSkills.map((skill) => (
              <li
                key={skill}
                className="flex items-start gap-2 text-sm leading-relaxed text-ep-text-primary"
              >
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-ep-primary" aria-hidden />
                {skill}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {skills.map((cat) => (
            <motion.div
              key={cat.title}
              variants={itemVariants}
              className="rounded-xl border border-ep-separator bg-white p-5 shadow-[0_2px_8px_rgb(0,0,0,0.06)]"
            >
              <p className="text-sm font-bold text-ep-text-primary">
                {cat.title}
              </p>
              {cat.content && (
                <p className="mt-2 text-sm leading-relaxed text-ep-text-muted">
                  {cat.content}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Formation */}
      <div className="mt-16">
        <motion.h3
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-ep-text-primary"
        >
          <GraduationCap className="size-6 text-ep-primary" strokeWidth={1.5} aria-hidden />
          Formation
        </motion.h3>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {diplomas.map((d) => (
            <motion.div
              key={d.title}
              variants={itemVariants}
              className="rounded-xl border border-ep-separator bg-white p-5 shadow-[0_2px_8px_rgb(0,0,0,0.06)]"
            >
              <p className="text-sm font-bold text-ep-text-primary">
                {d.title}
              </p>
              <p className="mt-1 text-xs text-ep-text-muted">
                {d.institution}
              </p>
              <p className="mt-1 text-xs text-ep-primary">{d.year}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Certifications */}
      <div className="mt-16">
        <motion.h3
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-ep-text-primary"
        >
          <Award className="size-6 text-ep-primary" strokeWidth={1.5} aria-hidden />
          Certifications
        </motion.h3>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {certifications.map((c) => (
            <motion.div
              key={c.title}
              variants={itemVariants}
              className="rounded-xl border border-ep-separator bg-white p-5 shadow-[0_2px_8px_rgb(0,0,0,0.06)]"
            >
              <p className="text-sm font-bold text-ep-text-primary">
                {c.title}
              </p>
              <p className="mt-1 text-xs text-ep-text-muted">{c.issuer}</p>
              {c.year && (
                <p className="mt-1 text-xs text-ep-primary">{c.year}</p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Langues */}
      <div className="mt-16">
        <motion.h3
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-8 flex items-center justify-center gap-2 text-xl font-bold text-ep-text-primary"
        >
          <Globe className="size-6 text-ep-primary" strokeWidth={1.5} aria-hidden />
          Langues
        </motion.h3>
        <motion.div
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {languages.map((lang) => (
            <motion.div
              key={lang.name}
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-ep-separator bg-white px-5 py-2.5 shadow-[0_2px_8px_rgb(0,0,0,0.06)]"
            >
              <span className="text-sm font-bold text-ep-text-primary">
                {lang.name}
              </span>
              <span className="text-xs text-ep-text-muted">{lang.level}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ProductSection>
  )
}

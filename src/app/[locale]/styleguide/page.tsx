import type { Metadata } from "next";
import type { ReactNode } from "react";
import { setRequestLocale } from "next-intl/server";
import {
  Container,
  Section,
  Eyebrow,
  SectionTitle,
  Button,
  BracketFrame,
  Hairline,
  Prose,
} from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

/* -------------------------------------------------------------------------- */
/* Reference data, mirrors DESIGN.md. Kept local: this route is temporary.    */
/* -------------------------------------------------------------------------- */

const colors = [
  {
    token: "--color-brand-700",
    utility: "brand-700",
    hex: "#39817B",
    swatch: "bg-brand-700",
    ratio: "4.57:1 on white",
    use: "Primary. Buttons, headings, rules.",
  },
  {
    token: "--color-brand-600",
    utility: "brand-600",
    hex: "#3F8E87",
    swatch: "bg-brand-600",
    ratio: "3.87:1 on white",
    use: "Display text ≥24px, borders, fills ONLY.",
  },
  {
    token: "--color-brand-900",
    utility: "brand-900",
    hex: "#14413E",
    swatch: "bg-brand-900",
    ratio: "11.3:1 with white text",
    use: "Dark bands, footer.",
  },
  {
    token: "--color-brand-ink",
    utility: "brand-ink",
    hex: "#2A6560",
    swatch: "bg-brand-ink",
    ratio: "6.71:1 on white",
    use: "Links and small teal text on white.",
  },
  {
    token: "--color-neutral-500",
    utility: "neutral-500",
    hex: "#919191",
    swatch: "bg-neutral-500",
    ratio: "2.85:1, fails AA for text",
    use: "Hairlines and dividers ONLY.",
  },
  {
    token: "--color-ink",
    utility: "ink",
    hex: "#1A1A1A",
    swatch: "bg-ink",
    ratio: "17.4:1 on white",
    use: "Body copy.",
  },
  {
    token: "--color-paper",
    utility: "paper",
    hex: "#FFFFFF",
    swatch: "bg-paper border border-neutral-500",
    ratio: ", ",
    use: "Default background.",
  },
  {
    token: "--color-paper-alt",
    utility: "paper-alt",
    hex: "#FAFAF8",
    swatch: "bg-paper-alt border border-neutral-500",
    ratio: ", ",
    use: "Alternating section bands.",
  },
];

const typeScale = [
  {
    label: "h1 · .u-h1",
    spec: "700 · uppercase · 0.06em · 1.05 · clamp(2rem, 5vw, 3.75rem)",
    className: "u-display u-h1",
    sample: "Estudio Jurídico Gerke",
  },
  {
    label: "h2 · .u-h2",
    spec: "700 · uppercase · 0.06em · 1.05 · clamp(1.5rem, 3.2vw, 2.5rem)",
    className: "u-display u-h2",
    sample: "Áreas de práctica",
  },
  {
    label: "h3 · .u-h3",
    spec: "700 · uppercase · 0.06em · 1.05 · clamp(1.125rem, 2vw, 1.5rem)",
    className: "u-display u-h3",
    sample: "Inversión extranjera",
  },
  {
    label: "eyebrow · .u-eyebrow",
    spec: "700 · uppercase · 0.18em · 0.75rem · #2A6560",
    className: "u-eyebrow",
    sample: "Desde 1971",
  },
  {
    label: "lead · .u-lead",
    spec: "300 · clamp(1.125rem, 2vw, 1.375rem) · 1.55",
    className: "u-lead",
    sample:
      "Asesoramos a corporaciones extranjeras que invierten en Bolivia y a familias empresarias bolivianas.",
  },
  {
    label: "body · .u-body",
    spec: "400 · 1.0625/1.125rem · 1.7 · 68ch · #1A1A1A",
    className: "u-body",
    sample:
      "El estudio fue fundado en La Paz en 1971 y mantiene una práctica corporativa concentrada, con atención directa de los socios en cada asunto.",
  },
  {
    label: "numerals · .u-num",
    spec: "500 · tabular-nums · #2A6560 (brand-ink)",
    className: "u-num text-2xl",
    sample: "01 · 09 · 17 · 1971 · 2026",
  },
];

/* -------------------------------------------------------------------------- */
/* Local helpers, styleguide chrome only, not part of the design system.      */
/* -------------------------------------------------------------------------- */

function Spec({ children }: { children: ReactNode }) {
  return (
    <p className="mt-1 font-mono text-[0.6875rem] leading-relaxed text-ink/75">
      {children}
    </p>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-neutral-500/40 py-6 first:border-t-0 md:grid md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <p className="font-mono text-xs tracking-wide text-brand-ink">{label}</p>
      </div>
      <div className="mt-3 md:col-span-9 md:mt-0">{children}</div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

export default async function StyleguidePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* ------------------------------------------------------ masthead -- */}
      <Section tone="dark">
        <SectionTitle level={1} eyebrow="Sistema de diseño · Design system">
          Styleguide
        </SectionTitle>
        <Prose lead className="mt-6">
          Every token, type step and component in the system, rendered from the
          same source as the site. Temporary route, delete before launch.
        </Prose>
        <p className="mt-8 font-mono text-xs text-paper/70">
          locale: {locale} · verify at 360 / 390 / 768 / 1024 / 1440 px
        </p>
      </Section>

      {/* --------------------------------------------------------- color -- */}
      <Section tone="paper">
        <SectionTitle level={2} eyebrow="01" marker>
          Color
        </SectionTitle>
        <Prose className="mt-5">
          <p>
            Pre-validated for contrast. Do not substitute.{" "}
            <strong>Body copy is #1A1A1A</strong>, never #3F8E87, never
            #919191.
          </p>
        </Prose>

        <div className="mt-10 flex flex-col">
          {colors.map((c) => (
            <div
              key={c.token}
              className="flex flex-col gap-4 border-t border-neutral-500/40 py-5 first:border-t-0 sm:flex-row sm:items-center"
            >
              <div
                className={`h-14 w-full shrink-0 rounded-bracket sm:w-28 ${c.swatch}`}
              />
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm text-ink">{c.token}</p>
                <p className="mt-1 text-sm text-ink/70">{c.use}</p>
              </div>
              {/* Hex + ratio are data a reader must parse, so they render in
                  ink, not in .u-num. See the note under DESIGN.md §2. */}
              <div className="shrink-0 sm:w-56 sm:text-right">
                <p className="text-sm font-medium tabular-nums text-ink">
                  {c.hex}
                </p>
                <p className="mt-1 font-mono text-[0.6875rem] text-ink/75">
                  {c.ratio}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Eyebrow>Uso correcto e incorrecto</Eyebrow>
          <div className="mt-4 u-grid-12">
            <BracketFrame
              openSide="none"
              tone="muted"
              className="p-5 md:col-span-3 lg:col-span-6"
            >
              <p className="u-num text-2xl">Numeral .u-num en brand-ink</p>
              <p className="mt-3 text-ink">
                Cuerpo de texto en #1A1A1A, correcto.
              </p>
              <p className="mt-3 text-sm text-brand-ink">
                Enlace o texto teal pequeño en brand-ink, correcto.
              </p>
              <Spec>✓ 6.71:1, safe at any size · ✓ 17.4:1 · ✓ 6.71:1</Spec>
            </BracketFrame>
            <BracketFrame
              openSide="none"
              tone="muted"
              className="p-5 md:col-span-3 lg:col-span-6"
            >
              <p className="text-sm text-neutral-500 line-through">
                Texto pequeño en neutral-500, prohibido
              </p>
              <p className="mt-3 text-sm text-brand-600 line-through">
                Texto pequeño en brand-600, prohibido
              </p>
              <Spec>
                ✗ 2.85:1 · ✗ 3.87:1, both fail WCAG AA. Shown struck through
                for reference only; never ship either.
              </Spec>
            </BracketFrame>
          </div>
        </div>
      </Section>

      {/* ---------------------------------------------------------- type -- */}
      <Section tone="alt">
        <SectionTitle level={2} eyebrow="02" marker>
          Tipografía
        </SectionTitle>
        <Prose className="mt-5">
          <p>
            Ubuntu únicamente, 300 / 400 / 500 / 700, subsets{" "}
            <strong>latin + latin-ext</strong>. Prueba de acentos: á é í ó ú ñ ü
            Á É Í Ó Ú Ñ ¿ ¡ « ».
          </p>
        </Prose>

        <div className="mt-10">
          {typeScale.map((t) => (
            <Row key={t.label} label={t.label}>
              <p className={t.className}>{t.sample}</p>
              <Spec>{t.spec}</Spec>
            </Row>
          ))}
          <Row label="weights">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-light">300 Light, lead paragraphs</p>
              <p className="text-xl font-normal">400 Regular, body copy</p>
              <p className="text-xl font-medium">500 Medium, numerals</p>
              <p className="text-xl font-bold">700 Bold, display, eyebrow</p>
            </div>
          </Row>
        </div>
      </Section>

      {/* ------------------------------------------------------- spacing -- */}
      <Section tone="paper">
        <SectionTitle level={2} eyebrow="03" marker>
          Espaciado y grilla
        </SectionTitle>

        <div className="mt-10">
          <Row label="--spacing-section">
            <div className="w-full bg-brand-700/10">
              <div className="h-section" />
            </div>
            <Spec>
              clamp(4rem, 9vw, 8rem), vertical rhythm, top and bottom of every
              Section
            </Spec>
          </Row>
          <Row label="--container-site">
            <p className="u-body">
              Max-width 1200px · padding 1.25rem mobile / 2.5rem ≥768px. This
              page is inside one.
            </p>
          </Row>
          <Row label=".u-grid-12">
            <div className="u-grid-12">
              {Array.from({ length: 12 }, (_, i) => (
                <div
                  key={i}
                  className="rounded-bracket bg-brand-700/10 py-3 text-center md:col-span-1"
                >
                  <span aria-hidden="true" className="u-num text-xs">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
            <Spec>
              12 columns ≥1024px · 6 columns 768–1023px · single column below
            </Spec>
          </Row>
          <Row label="measure">
            <Prose>
              <p>
                El ancho máximo de texto corrido es 68ch. Esta línea se corta
                exactamente en ese punto, sin importar el ancho de la ventana,
                para que la lectura no se fatigue en pantallas anchas.
              </p>
            </Prose>
          </Row>
        </div>
      </Section>

      {/* ------------------------------------------------------- bracket -- */}
      <Section tone="alt">
        <SectionTitle level={2} eyebrow="04" marker>
          El motivo del corchete
        </SectionTitle>
        <Prose className="mt-5">
          <p>
            Una regla redondeada de 2px que se abre por un lado. Se usa
            deliberadamente, no como decoración: marcadores de sección, marcos
            de ficha, estados hover, citas destacadas.
          </p>
        </Prose>

        <div className="mt-10 u-grid-12">
          {(["right", "left", "top", "bottom", "none"] as const).map((side) => (
            <BracketFrame
              key={side}
              openSide={side}
              className="p-6 md:col-span-3 lg:col-span-4"
            >
              <p className="u-eyebrow">openSide</p>
              <p className="mt-2 u-display u-h3">{side}</p>
            </BracketFrame>
          ))}
          <BracketFrame
            openSide="right"
            tone="muted"
            className="p-6 md:col-span-3 lg:col-span-4"
          >
            <p className="u-eyebrow">tone</p>
            <p className="mt-2 u-display u-h3">muted</p>
          </BracketFrame>
        </div>

        <div className="mt-8 rounded-bracket bg-brand-900 p-8 u-on-dark">
          <BracketFrame openSide="right" tone="dark" className="p-6">
            <p className="u-eyebrow">tone</p>
            <p className="mt-2 u-display u-h3">dark</p>
          </BracketFrame>
        </div>

        <div className="mt-12">
          <Eyebrow>variant=&quot;marker&quot;</Eyebrow>
          <div className="mt-4 flex flex-wrap items-start gap-8">
            {(["right", "left", "top", "bottom"] as const).map((side) => (
              <div key={side}>
                <BracketFrame variant="marker" openSide={side} />
                <p className="mt-2 font-mono text-xs text-ink/60">{side}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Eyebrow>Cita destacada</Eyebrow>
          <BracketFrame as="blockquote" openSide="right" className="mt-4 max-w-3xl p-8">
            <p className="u-lead">
              El estudio ha acompañado la inversión extranjera en Bolivia desde
              1971, con una práctica corporativa concentrada y atención directa
              de los socios.
            </p>
          </BracketFrame>
        </div>
      </Section>

      {/* ---------------------------------------------------- components -- */}
      <Section tone="paper">
        <SectionTitle level={2} eyebrow="05" marker>
          Componentes
        </SectionTitle>

        <div className="mt-10">
          <Row label="Button">
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Contactar al estudio</Button>
              <Button variant="ghost">Ver áreas de práctica</Button>
              <Button variant="primary" href="/styleguide">
                Como enlace
              </Button>
              <Button variant="ghost" disabled>
                Deshabilitado
              </Button>
            </div>
            <Spec>
              primary = solid brand-700, white label · ghost = 2px brand-700
              outline, brand-700 label (4.57:1)
            </Spec>
          </Row>

          <Row label="Eyebrow">
            <Eyebrow>Áreas de práctica</Eyebrow>
            <Spec>700 · uppercase · 0.18em · 0.75rem · brand-ink</Spec>
          </Row>

          <Row label="SectionTitle">
            <div className="flex flex-col gap-8">
              <SectionTitle level={2} eyebrow="Con eyebrow y marker" marker>
                Título de sección
              </SectionTitle>
              <SectionTitle level={3} color="ink">
                Título en tinta
              </SectionTitle>
            </div>
            <Spec>level 1 | 2 | 3 · color brand (#14413E) | ink (#1A1A1A)</Spec>
          </Row>

          <Row label="Hairline">
            <div className="flex flex-col gap-6">
              <Hairline />
              <Hairline variant="short" />
            </div>
            <Spec>1px neutral-500 · full | short, the only use of that color</Spec>
          </Row>

          <Row label="Prose">
            <Prose>
              <p>
                Texto corrido a 68ch, 1.7 de interlineado, en #1A1A1A. Incluye{" "}
                <strong>énfasis</strong> y{" "}
                <a href="#top">enlaces en brand-ink</a>.
              </p>
              <p>
                Un segundo párrafo para verificar el ritmo vertical entre
                bloques de texto.
              </p>
              <ul>
                <li>Viñeta con el corchete reducido a su forma mínima</li>
                <li>Segunda viñeta</li>
              </ul>
              <ol>
                <li>Lista numerada con numerales tabulares</li>
                <li>Segundo elemento</li>
              </ol>
            </Prose>
          </Row>

          <Row label="Container">
            <p className="u-body">
              Wraps this entire column. Max-width 1200px, centered, responsive
              side padding.
            </p>
          </Row>
        </div>
      </Section>

      {/* ---------------------------------------------------- Section tone */}
      <Section tone="alt">
        <SectionTitle level={2} eyebrow="06" marker>
          Section tone
        </SectionTitle>
        <Prose className="mt-5">
          <p>
            Esta banda es <strong>tone=&quot;alt&quot;</strong> (#FAFAF8). La
            siguiente es <strong>tone=&quot;dark&quot;</strong>.
          </p>
        </Prose>
      </Section>

      <Section tone="dark">
        <SectionTitle level={2} eyebrow="Banda oscura" marker>
          tone=&quot;dark&quot;
        </SectionTitle>
        <Prose className="mt-5">
          <p>
            Sobre brand-900 el texto es blanco (11.3:1). El texto secundario usa
            blanco al 80–88%, nunca un gris medio.
          </p>
        </Prose>
        <div className="mt-8 flex flex-wrap gap-4">
          <span className="u-num">01 · 1971</span>
          <Hairline onDark className="mt-3" />
        </div>
      </Section>

      {/* -------------------------------------------------------- motion -- */}
      <Section tone="paper">
        <SectionTitle level={2} eyebrow="07" marker>
          Movimiento
        </SectionTitle>
        <Prose className="mt-5">
          <p>
            Una sola utilidad: <strong>revealOnScroll</strong>. Opacidad 0→1,
            translateY 12px→0, 360ms ease-out, una sola vez vía
            IntersectionObserver. Desactivada por completo bajo{" "}
            <strong>prefers-reduced-motion: reduce</strong>. No hay ninguna otra
            animación en el sitio.
          </p>
        </Prose>

        <div className="mt-10 u-grid-12">
          {[0, 80, 160].map((delay, i) => (
            <Reveal
              key={delay}
              delay={delay}
              className="md:col-span-2 lg:col-span-4"
            >
              <BracketFrame openSide="right" className="p-6">
                {/* Ornamental index: aria-hidden, per DESIGN.md §2. */}
                <p aria-hidden="true" className="u-num text-sm">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 u-display u-h3">Reveal</p>
                <Spec>delay {delay}ms</Spec>
              </BracketFrame>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------ overflow -- */}
      {/* contained={false} + an explicit Container: the escape hatch for
          sections that need to lay out their own full-bleed content. */}
      <Section tone="alt" contained={false}>
        <Container>
          <SectionTitle level={2} eyebrow="08" marker>
            Verificación responsive
          </SectionTitle>
          <Prose className="mt-5">
            <p>
              Revisar esta página a 360, 390, 768, 1024 y 1440 px. No debe
              existir desplazamiento horizontal en ningún punto.
            </p>
          </Prose>
          <div className="mt-8 rounded-bracket border-2 border-neutral-500 p-5">
            <p className="break-words text-sm font-medium tabular-nums text-ink">
              360 · 390 · 768 · 1024 · 1440
            </p>
            <p className="mt-2 u-body">
              Palabra larga de control: internacionalización
              constitucionalidad, debe envolver, no desbordar.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}

import type { ComponentPropsWithoutRef } from "react";
import { BracketFrame } from "@/components/ui";

/**
 * How MDX article bodies map onto the design system. Passed to `compileMDX`
 * from the article page, see DESIGN.md's Publications section.
 *
 * `.u-prose` (the class the article body renders inside, via <Prose>) already
 * styles p/strong/a/ul/ol with brand-600 markers, see globals.css. What it
 * does not cover, because they need actual component structure rather than a
 * bare-tag CSS rule, are these four.
 */
export const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="u-display u-h3 mb-4 mt-12 first:mt-0" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mb-3 mt-8 text-base font-bold uppercase tracking-[0.04em] text-ink" {...props} />
  ),
  // Pull quote: the bracket motif, in brand-900, per the client's spec.
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => (
    <BracketFrame
      as="blockquote"
      openSide="right"
      className="my-8 p-6 text-lg font-light leading-snug text-brand-900 lg:p-8 lg:text-xl"
    >
      {children}
    </BracketFrame>
  ),
  table: (props: ComponentPropsWithoutRef<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      className="border-b-2 border-brand-600 px-3 py-2 text-left font-medium uppercase tracking-[0.02em] text-ink"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td className="border-b border-neutral-500/40 px-3 py-2 align-top text-ink" {...props} />
  ),
};

import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ComponentProps,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { Link } from "@/i18n/navigation";

export type ButtonVariant = "primary" | "ghost";

/** Routes declared in the slug map — typed, so a bad link fails the build. */
type InternalHref = ComponentProps<typeof Link>["href"];

type ExternalHref =
  | `https://${string}`
  | `http://${string}`
  | `mailto:${string}`
  | `tel:${string}`
  | `#${string}`;

export type ButtonHref = InternalHref | ExternalHref;

const EXTERNAL_HREF = /^(https?:|mailto:|tel:|#)/;

type CommonProps = {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: ButtonHref;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base = cn(
  "inline-flex min-h-11 items-center justify-center gap-2 text-center",
  "rounded-bracket border-2 border-solid",
  "px-6 py-3 text-sm font-medium uppercase tracking-[0.08em] leading-none",
  "transition-[color,background-color,border-color] duration-200 ease-out",
  "disabled:pointer-events-none disabled:opacity-50",
);

const variants: Record<ButtonVariant, string> = {
  // Solid brand-700 with white copy — 4.57:1 white-on-brand-700 inverted.
  primary: cn(
    "bg-brand-700 border-brand-700 text-paper",
    "hover:bg-brand-900 hover:border-brand-900",
  ),
  // Outlined. Label is brand-700 (4.57:1 on white), never brand-600.
  ghost: cn(
    "bg-transparent border-brand-700 text-brand-700",
    "hover:bg-brand-700 hover:text-paper",
  ),
};

/**
 * The only button in the system. See DESIGN.md §6.
 * Renders a locale-aware <Link> for internal hrefs, <a> for external ones.
 */
export function Button(props: ButtonProps) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (props.href !== undefined) {
    const { href, ...anchorProps } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: ButtonHref;
    };

    if (typeof href === "string" && EXTERNAL_HREF.test(href)) {
      return (
        <a href={href} className={classes} {...anchorProps}>
          {children}
        </a>
      );
    }

    // Everything else is an internal route: the external shapes are excluded
    // above, but TypeScript cannot narrow a template-literal union that way.
    return (
      <Link href={href as InternalHref} className={classes} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

export default Button;

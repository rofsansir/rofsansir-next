import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary: "bg-marigold text-ink hover:-translate-y-0.5 hover:shadow-card",
        outline:
          "border border-ink/15 bg-paper/60 text-ink backdrop-blur hover:border-ink/30 hover:bg-paper",
        dark: "bg-ink text-cream hover:bg-ink/90 hover:-translate-y-0.5 hover:shadow-card",
        plum: "bg-plum text-cream hover:bg-plum-2 hover:-translate-y-0.5",
        ghost: "text-ink hover:bg-ink/5",
        "ghost-light": "text-cream/80 hover:text-cream hover:bg-cream/10",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-sm",
        lg: "px-7 py-3.5 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type CommonProps = VariantProps<typeof buttonVariants> & {
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & {
  href: string;
  /** Force open in a new tab. Defaults by protocol (http/mailto/tel). */
  external?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant, size, className, children, ...rest } = props;
  const classes = buttonVariants({ variant, size, className });

  if ("href" in props && props.href !== undefined) {
    const { href } = props;
    const isExternal = props.external ?? /^(https?:|mailto:|tel:)/.test(href);
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}

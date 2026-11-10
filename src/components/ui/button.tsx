import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonElementProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type AnchorElementProps = CommonProps &
  Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    href: string;
  };

export type ButtonProps = ButtonElementProps | AnchorElementProps;

function buttonClass(variant: Variant, className?: string) {
  return cn(
    "inline-flex cursor-pointer items-center justify-center gap-5 font-medium transition-opacity disabled:cursor-wait disabled:opacity-70",
    variant === "primary" &&
      "bg-brand text-button px-8 py-5 text-white sm:px-10",
    variant === "light" &&
      "rounded-full bg-white/65 px-5 py-3 text-lg leading-[1.2] whitespace-nowrap text-black xl:px-6 xl:py-4 xl:text-xl",
    className,
  );
}

function isLink(props: ButtonProps): props is AnchorElementProps {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  if (isLink(props)) {
    const {
      href,
      children,
      variant = "primary",
      className,
      ...anchorProps
    } = props;
    const classes = buttonClass(variant, className);

    if (href.startsWith("/")) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const {
    children,
    variant = "primary",
    className,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      type={type}
      className={buttonClass(variant, className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

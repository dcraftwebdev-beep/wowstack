import React from "react";
import { Link } from "react-router-dom";
import s from "./Button.module.css";

/**
 * Shared button used across the site.
 *
 *   <Button to="/contact">Start a project</Button>            → router Link
 *   <Button href="https://…" target="_blank">Visit</Button>   → anchor
 *   <Button onClick={fn} variant="ghost">Cancel</Button>      → <button>
 *
 * variant: "primary" (amber) | "ghost" (outline) | "dark" | "light"
 * size:    "sm" | "md" | "lg"
 */
export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  icon,          // trailing icon
  iconLeft,      // leading icon
  full = false,  // full width
  className = "",
  children,
  ...rest
}) {
  const cls = [s.btn, s[variant], s[size], full ? s.full : "", className].filter(Boolean).join(" ");

  const inner = (
    <>
      {iconLeft && <span className={`${s.ico} ${s.icoLead}`}>{iconLeft}</span>}
      {children && <span className={s.label}>{children}</span>}
      {icon && <span className={`${s.ico} ${s.icoTrail}`}>{icon}</span>}
    </>
  );

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{inner}</a>;
  return <button className={cls} {...rest}>{inner}</button>;
}

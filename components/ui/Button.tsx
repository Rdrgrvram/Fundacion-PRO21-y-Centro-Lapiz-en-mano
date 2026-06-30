import type { ButtonHTMLAttributes } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  external?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary:   'bg-primary text-white hover:bg-primary/90',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  outline:   'border-2 border-primary text-primary hover:bg-primary hover:text-white',
  ghost:     'text-primary hover:bg-primary/10',
}

const SIZES: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3.5 text-lg',
}

const BASE = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`

  if (href) {
    return external
      ? <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{children}</a>
      : <Link href={href} className={classes}>{children}</Link>
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

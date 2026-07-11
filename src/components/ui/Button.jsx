const VARIANTS = {
  primary: 'bg-accent-amber text-charcoal hover:bg-accent-amber/90',
  outline: 'border border-haze/30 text-haze hover:bg-haze/10',
  outlineDark: 'border border-ink/20 text-ink hover:bg-ink/5',
}

export default function Button({ children, variant = 'primary', as: Tag = 'button', className = '', ...props }) {
  return (
    <Tag
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-amber ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}

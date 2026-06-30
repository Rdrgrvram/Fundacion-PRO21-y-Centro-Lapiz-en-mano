type BadgeColor = 'primary' | 'secondary' | 'green' | 'blue' | 'orange' | 'gray'

interface BadgeProps {
  children: React.ReactNode
  color?: BadgeColor
}

const COLORS: Record<BadgeColor, string> = {
  primary:   'bg-primary/10 text-primary',
  secondary: 'bg-secondary/10 text-secondary',
  green:     'bg-green-100 text-green-700',
  blue:      'bg-blue-100 text-blue-700',
  orange:    'bg-orange-100 text-orange-700',
  gray:      'bg-gray-100 text-gray-600',
}

export default function Badge({ children, color = 'primary' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${COLORS[color]}`}>
      {children}
    </span>
  )
}

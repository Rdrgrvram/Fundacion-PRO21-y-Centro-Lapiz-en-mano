interface ImpactStatProps {
  value: string
  label: string
  icon?: string
}

export default function ImpactStat({ value, label, icon }: ImpactStatProps) {
  return (
    <div className="text-center p-6">
      {icon && <div className="text-4xl mb-2">{icon}</div>}
      <div className="text-4xl font-bold text-primary">{value}</div>
      <div className="mt-1 text-sm text-gray-600">{label}</div>
    </div>
  )
}

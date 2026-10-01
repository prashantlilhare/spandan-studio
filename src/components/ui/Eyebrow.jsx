export default function Eyebrow({ index, children, className = '', tone = 'text-stone' }) {
  return (
    <p className={`eyebrow flex items-center gap-4 ${tone} ${className}`}>
      {index && <span className="tabular-nums">({index})</span>}
      <span aria-hidden="true" className="h-px w-10 bg-current opacity-40" />
      <span>{children}</span>
    </p>
  )
}

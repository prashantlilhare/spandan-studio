import { useEffect, useRef, useState } from 'react'

/**
 * Lazy artwork image. Fills its parent (give the parent a size or aspect ratio),
 * fades in on load, and degrades to a quiet hatched placeholder if the file is missing.
 */
export default function ArtImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  fit = 'cover',
  draggable,
}) {
  const ref = useRef(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    setStatus('loading')
    const el = ref.current
    if (el?.complete) setStatus(el.naturalWidth ? 'loaded' : 'error')
  }, [src])

  return (
    <div className={`relative overflow-hidden bg-ink-3 ${className}`}>
      {status !== 'error' && (
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          draggable={draggable}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} transition-opacity duration-700 ease-expo ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      )}
      {status === 'loading' && (
        <span aria-hidden="true" className="absolute inset-0 animate-pulse bg-bone/[0.03]" />
      )}
      {status === 'error' && (
        <div role="img" aria-label={alt} className="art-fallback absolute inset-0 flex items-end p-4">
          <span className="eyebrow text-[10px] text-stone/50">{src.split('/').pop()}</span>
        </div>
      )}
    </div>
  )
}

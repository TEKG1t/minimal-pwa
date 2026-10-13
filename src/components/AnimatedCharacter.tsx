import { useEffect, useState } from 'react'

type AnimationManifest = {
  id: string
  frames: string[]
  fps: number
  loop: boolean
  anchor?: { x: number; y: number }
}

type AnimatedCharacterProps = {
  manifestUrl: string
  name: string
  className?: string
}

export default function AnimatedCharacter({ manifestUrl, name, className = '' }: AnimatedCharacterProps) {
  const [manifest, setManifest] = useState<AnimationManifest | null>(null)
  const [frame, setFrame] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetch(manifestUrl, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Animation manifest failed to load: ${response.status}`)
        const nextManifest = await response.json() as AnimationManifest
        if (!nextManifest.frames?.length || nextManifest.fps <= 0) {
          throw new Error('Animation manifest must define frames and a positive fps value')
        }
        setFrame(0)
        setError(null)
        setManifest(nextManifest)
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === 'AbortError') return
        const message = reason instanceof Error ? reason.message : 'Unknown animation loading error'
        console.error(message)
        setError(message)
      })

    return () => controller.abort()
  }, [manifestUrl])

  useEffect(() => {
    if (!manifest || manifest.frames.length < 2) return
    const interval = window.setInterval(() => {
      setFrame((current) => {
        const next = current + 1
        return next < manifest.frames.length ? next : manifest.loop ? 0 : current
      })
    }, 1000 / manifest.fps)
    return () => window.clearInterval(interval)
  }, [manifest])

  if (error) return <span className={`${className} animated-character-error`} role="img" aria-label={`${name} animation unavailable`}>?</span>
  if (!manifest) return <span className={`${className} animated-character-loading`} aria-hidden="true" />

  const frameUrl = new URL(manifest.frames[frame], new URL(manifestUrl, window.location.href)).href
  return <img className={`${className} animated-character`} src={frameUrl} alt={name} draggable={false} />
}

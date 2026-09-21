'use client'

import { useEffect, useRef } from 'react'

// Scroll-driven wave divider, ported 1:1 from the original static site's main.js.
export default function WaveDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    function resize() {
      if (!canvas) return
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // The canvas can still be 0×0 right at mount (layout not settled yet) — a
    // ResizeObserver catches the real size as soon as it's known, not just on window resize.
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const rootStyles = getComputedStyle(document.documentElement)
    const col = (name: string) => rootStyles.getPropertyValue(name).trim()

    let frame: number

    function drawWave(t: number) {
      if (!canvas || !ctx) return
      const r = canvas.getBoundingClientRect()
      const w = r.width
      const h = r.height
      ctx.clearRect(0, 0, w, h)

      const line = col('--line-strong') || '#C3CEDA'
      const accent = col('--accent') || '#0048A8'
      const scrollPhase = window.scrollY * 0.014
      const idlePhase = reduced ? 0 : t * 0.0003

      const layers = [
        { amp: h * 0.3, freq: 0.017, speed: 1.0, color: line, alpha: 0.55 },
        { amp: h * 0.2, freq: 0.026, speed: -0.7, color: accent, alpha: 0.28 },
        { amp: h * 0.13, freq: 0.035, speed: 1.5, color: line, alpha: 0.35 },
      ]

      layers.forEach((layer) => {
        ctx.beginPath()
        for (let x = 0; x <= w; x += 6) {
          const y = h * 0.5 + Math.sin(x * layer.freq + scrollPhase * layer.speed + idlePhase * layer.speed) * layer.amp
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = layer.color
        ctx.globalAlpha = layer.alpha
        ctx.lineWidth = 1
        ctx.stroke()
      })
      ctx.globalAlpha = 1

      if (!reduced) frame = requestAnimationFrame(drawWave)
    }

    if (reduced) drawWave(0)
    else frame = requestAnimationFrame(drawWave)

    return () => {
      window.removeEventListener('resize', resize)
      observer.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas className="wave" ref={canvasRef} aria-hidden="true" />
}

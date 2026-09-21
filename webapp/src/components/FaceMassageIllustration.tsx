'use client'

import { useEffect, useRef } from 'react'

// Thin-line illustration of a face receiving a facial massage. Each stroke
// "draws itself in" as the section scrolls through the viewport, the same
// scroll-driven idea as the wave divider (see WaveDivider.tsx).
export default function FaceMassageIllustration() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const paths = Array.from(svg.querySelectorAll('path'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const lengths = paths.map((p) => p.getTotalLength())
    paths.forEach((p, i) => {
      p.style.strokeDasharray = `${lengths[i]}`
      p.style.strokeDashoffset = reduced ? '0' : `${lengths[i]}`
    })

    if (reduced) return

    let frame: number | null = null

    function update() {
      frame = null
      const section = svg!.closest('section')
      if (!section) return
      const r = section.getBoundingClientRect()
      // 0 when the section's top just enters the viewport, 1 once it's scrolled past.
      const progress = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)))
      const drawn = Math.min(1, progress * 1.6)

      paths.forEach((p, i) => {
        p.style.strokeDashoffset = `${lengths[i] * (1 - drawn)}`
      })
    }

    function onScroll() {
      if (frame === null) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame !== null) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <svg
      ref={svgRef}
      className="face-illustration"
      viewBox="0 0 220 380"
      fill="none"
      aria-hidden="true"
    >
      {/* face profile: forehead, nose, lips, chin, jaw, neck */}
      <path
        d="M100 40
           C 70 40, 55 70, 56 105
           C 57 130, 62 138, 58 150
           C 54 160, 66 165, 74 160
           C 80 172, 78 186, 86 192
           C 96 200, 92 210, 82 214
           C 96 222, 112 218, 116 206
           C 128 208, 138 200, 138 186
           C 150 178, 152 160, 144 148
           C 156 138, 158 112, 148 92
           C 140 60, 122 40, 100 40 Z"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* eye + brow */}
      <path
        d="M78 118 C 84 113, 92 113, 97 118"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M80 130 C 85 133, 91 133, 95 129"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* hand resting on the cheek, mid-massage */}
      <path
        d="M180 150
           C 168 146, 156 150, 148 160
           C 140 170, 130 176, 118 178
           C 128 184, 140 182, 148 176
           C 142 186, 136 196, 138 206
           C 146 200, 152 190, 158 182
           C 156 194, 158 204, 166 210
           C 168 198, 170 188, 178 180
           C 186 174, 192 164, 190 152
           C 187 150, 183 149, 180 150 Z"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* soft motion lines, suggesting the massage gesture */}
      <path d="M40 175 C 50 172, 58 172, 66 176" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M36 195 C 48 193, 58 194, 68 199" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M42 215 C 52 214, 60 215, 68 219" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

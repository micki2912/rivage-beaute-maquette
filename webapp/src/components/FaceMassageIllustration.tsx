'use client'

import { useEffect, useRef } from 'react'

// Thin-line illustration of a woman's face receiving a facial massage — the
// hands loop through a gentle massaging motion once the illustration scrolls
// into view (paused otherwise, and honors prefers-reduced-motion).
export default function FaceMassageIllustration() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        svg.classList.toggle('in-view', entry.isIntersecting)
      },
      { threshold: 0.2 }
    )
    observer.observe(svg)
    return () => observer.disconnect()
  }, [])

  return (
    <svg ref={svgRef} className="face-illustration" viewBox="0 0 240 260" fill="none" aria-hidden="true">
      {/* face: front-facing oval, hairline, eyes, brows, nose, lips */}
      <path
        d="M120 24
           C 84 24, 66 56, 66 92
           C 66 118, 70 132, 66 148
           C 62 164, 66 182, 78 196
           C 90 212, 104 222, 120 222
           C 136 222, 150 212, 162 196
           C 174 182, 178 164, 174 148
           C 170 132, 174 118, 174 92
           C 174 56, 156 24, 120 24 Z"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M70 78 C 82 62, 100 58, 120 60" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M170 78 C 158 62, 140 58, 120 60" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      {/* brows */}
      <path d="M86 100 C 92 96, 100 96, 106 100" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M134 100 C 140 96, 148 96, 154 100" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      {/* eyes */}
      <path d="M88 112 C 93 108, 101 108, 106 112" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M134 112 C 139 108, 147 108, 152 112" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      {/* nose */}
      <path d="M120 108 C 118 122, 116 136, 112 144 C 114 149, 119 150, 123 148" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      {/* lips */}
      <path d="M102 168 C 110 172, 130 172, 138 168" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M104 174 C 112 178, 128 178, 136 174" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />

      {/* left hand, resting on / massaging the left cheek */}
      <g className="massage-hand massage-hand-left">
        <path
          d="M30 150
             C 20 142, 12 130, 14 116
             C 15 108, 22 104, 28 108
             C 26 98, 30 88, 38 86
             C 44 84, 49 90, 49 97
             C 52 90, 59 87, 65 91
             C 70 94, 70 101, 67 107
             C 74 107, 79 113, 78 120
             C 77 128, 70 132, 63 131
             C 66 140, 63 150, 55 154
             C 46 158, 36 156, 30 150 Z"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* right hand, mirrored */}
      <g className="massage-hand massage-hand-right">
        <path
          d="M210 150
             C 220 142, 228 130, 226 116
             C 225 108, 218 104, 212 108
             C 214 98, 210 88, 202 86
             C 196 84, 191 90, 191 97
             C 188 90, 181 87, 175 91
             C 170 94, 170 101, 173 107
             C 166 107, 161 113, 162 120
             C 163 128, 170 132, 177 131
             C 174 140, 177 150, 185 154
             C 194 158, 204 156, 210 150 Z"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  )
}

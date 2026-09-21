'use client'

import { useEffect, useRef } from 'react'

// Line-art illustration of a woman receiving a facial massage (eyes closed,
// hair wrapped in a towel), traced from the reference the user provided.
// Each finger animates independently once the illustration scrolls into
// view, as a small rolling press — paused otherwise, and honors
// prefers-reduced-motion.
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
      {/* towel wrap */}
      <path
        d="M92 30 C 104 16, 122 10, 138 16 C 150 20, 148 28, 140 30
           C 152 34, 162 44, 160 56 C 172 50, 182 58, 180 68
           C 178 78, 168 80, 160 76 C 150 92, 132 98, 118 92"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M96 60 C 104 48, 116 42, 128 44" stroke="var(--accent)" strokeWidth="1.3" strokeLinecap="round" />

      {/* face + jaw, chin, neck, shoulders */}
      <path
        d="M84 66 C 78 84, 76 100, 78 116
           C 80 134, 86 150, 98 162
           C 106 170, 114 176, 122 176
           C 130 176, 138 170, 146 162
           C 158 150, 164 134, 166 116
           C 168 100, 166 84, 160 66"
        stroke="var(--accent)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M96 172 C 92 186, 84 198, 70 208"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M148 172 C 152 186, 160 198, 174 208"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* brows */}
      <path d="M92 108 C 98 102, 108 100, 116 104" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M128 104 C 136 100, 146 102, 152 108" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />

      {/* closed eyes with lashes */}
      <path d="M92 122 C 98 126, 106 126, 112 121" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M110 122 L 114 126 M 108 124 L 111 129" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />
      <path d="M132 121 C 138 126, 146 126, 152 122" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M130 122 L 126 126 M 132 124 L 129 129" stroke="var(--accent)" strokeWidth="1" strokeLinecap="round" />

      {/* nose */}
      <path
        d="M122 108 C 121 122, 118 134, 114 140 C 116 145, 120 146, 124 144 C 128 146, 132 145, 134 140"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* lips */}
      <path d="M104 156 C 112 152, 132 152, 140 156" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M106 158 C 114 163, 130 163, 138 158" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />

      {/* left hand: wrist/palm + three independently-animated fingers */}
      <g className="massage-hand massage-hand-left">
        <path
          d="M8 120 C 30 108, 52 100, 72 112 C 78 116, 80 122, 76 128 C 92 132, 96 146, 88 154"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path className="massage-finger" style={{ transformOrigin: '76px 112px' }} d="M72 108 C 76 116, 78 124, 76 132" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
        <path className="massage-finger" style={{ animationDelay: '.15s', transformOrigin: '84px 122px' }} d="M82 108 C 86 118, 88 130, 84 140" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
        <path className="massage-finger" style={{ animationDelay: '.3s', transformOrigin: '92px 132px' }} d="M90 114 C 94 124, 95 136, 90 148" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      </g>

      {/* right hand, mirrored */}
      <g className="massage-hand massage-hand-right">
        <path
          d="M232 120 C 210 108, 188 100, 168 112 C 162 116, 160 122, 164 128 C 148 132, 144 146, 152 154"
          stroke="var(--accent)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path className="massage-finger" style={{ transformOrigin: '164px 112px' }} d="M168 108 C 164 116, 162 124, 164 132" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
        <path className="massage-finger" style={{ animationDelay: '.15s', transformOrigin: '156px 122px' }} d="M158 108 C 154 118, 152 130, 156 140" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
        <path className="massage-finger" style={{ animationDelay: '.3s', transformOrigin: '148px 132px' }} d="M150 114 C 146 124, 145 136, 150 148" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  )
}

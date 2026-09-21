'use client'

import { useEffect, useRef } from 'react'

type Stop = { t: number; tx: number; ty: number; rot: number; scale: number }

// Cycle mapped over scroll progress within the section (0 → 1):
// jaw → cheekbones → temples → light press at the temples → back to the jaw.
const LEFT_STOPS: Stop[] = [
  { t: 0, tx: 0, ty: 0, rot: 0, scale: 1 },
  { t: 0.25, tx: -8, ty: -50, rot: -3, scale: 1 },
  { t: 0.5, tx: -16, ty: -110, rot: -6, scale: 1 },
  { t: 0.68, tx: -16, ty: -110, rot: -6, scale: 1 },
  { t: 1, tx: 0, ty: 0, rot: 0, scale: 1 },
]
const RIGHT_STOPS: Stop[] = LEFT_STOPS.map((s) => ({ ...s, tx: -s.tx, rot: -s.rot }))

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function interpolate(stops: Stop[], progress: number) {
  let i = 0
  while (i < stops.length - 2 && progress > stops[i + 1].t) i++
  const a = stops[i]
  const b = stops[i + 1]
  const span = b.t - a.t
  const local = span > 0 ? (progress - a.t) / span : 0
  return {
    tx: a.tx + (b.tx - a.tx) * local,
    ty: a.ty + (b.ty - a.ty) * local,
    rot: a.rot + (b.rot - a.rot) * local,
    scale: a.scale + (b.scale - a.scale) * local,
  }
}

export default function FacialMassageScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftHandRef = useRef<SVGGElement>(null)
  const rightHandRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const leftHand = leftHandRef.current
    const rightHand = rightHandRef.current
    if (!section || !leftHand || !rightHand) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let rawProgress = 0
    let smoothProgress = 0
    let frame: number

    function computeRawProgress() {
      const rect = section!.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      rawProgress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0
    }

    function applyHand(hand: SVGGElement, stops: Stop[], progress: number, side: 1 | -1) {
      const { tx, ty, rot, scale } = interpolate(stops, progress)
      // Light pressing oscillation while lingering around the temples.
      const pressWindow = smoothstep(0.5, 0.62, progress) * (1 - smoothstep(0.72, 0.85, progress))
      const wobble = Math.sin(progress * Math.PI * 24) * pressWindow
      hand.style.transform = `translate(${tx}px, ${ty + wobble * 3}px) rotate(${rot + side * wobble}deg) scale(${scale - Math.abs(wobble) * 0.015})`
    }

    function tick() {
      computeRawProgress()
      smoothProgress += (rawProgress - smoothProgress) * 0.12
      if (Math.abs(smoothProgress - rawProgress) < 0.0005) smoothProgress = rawProgress
      applyHand(leftHand!, LEFT_STOPS, smoothProgress, -1)
      applyHand(rightHand!, RIGHT_STOPS, smoothProgress, 1)
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="massage-scroll-section" ref={sectionRef}>
      <div className="massage-scroll-sticky">
        <svg
          className="massage-scroll-svg"
          viewBox="0 0 800 900"
          fill="none"
          role="img"
          aria-label="Illustration d'un massage du visage"
        >
          <g stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            {/* towel */}
            <path d="M245 235 C265 105 355 55 400 55 C445 55 535 105 555 235" />
            <path d="M285 220 C315 155 360 125 400 125 C440 125 485 155 515 220" />
            {/* face */}
            <path d="M292 220 C270 285 265 430 292 555 C315 665 350 710 400 710 C450 710 485 665 508 555 C535 430 530 285 508 220" />
            {/* eyebrows */}
            <path d="M330 335 C350 322 370 322 385 334" />
            <path d="M415 334 C430 322 450 322 470 335" />
            {/* closed eyes */}
            <path d="M325 375 C345 392 365 392 382 375" />
            <path d="M418 375 C435 392 455 392 475 375" />
            {/* nose */}
            <path d="M400 380 C397 425 392 452 382 470 C390 478 398 480 406 470" />
            {/* lips */}
            <path d="M365 515 C382 503 393 503 400 510 C407 503 418 503 435 515" />
            <path d="M365 515 C382 535 418 535 435 515" />
            {/* neck / shoulders */}
            <path d="M340 680 L340 775 C340 800 285 810 220 835" />
            <path d="M460 680 L460 775 C460 800 515 810 580 835" />
            <path d="M220 835 C280 815 335 805 400 805 C465 805 520 815 580 835" />
          </g>

          <g
            id="hand-left"
            ref={leftHandRef}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: '297px 500px' }}
          >
            <path d="M15 250 C95 330 145 375 205 405 C245 425 275 455 292 500" />
            <path d="M80 190 C145 285 185 335 235 370 C270 395 295 430 305 465" />
            <path d="M15 350 C95 410 145 450 200 485 C245 515 270 540 292 575" />
            <path d="M65 445 C130 485 175 520 225 555 C255 575 280 595 300 615" />
            <path d="M292 500 C300 475 325 460 345 475 C358 486 355 510 342 528" />
            <path d="M292 575 C300 550 322 540 340 552 C353 562 350 585 338 600" />
            <path d="M300 615 C310 590 333 585 348 600 C358 611 353 635 340 647" />
          </g>

          <g
            id="hand-right"
            ref={rightHandRef}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transformOrigin: '508px 500px' }}
          >
            <path d="M785 250 C705 330 655 375 595 405 C555 425 525 455 508 500" />
            <path d="M720 190 C655 285 615 335 565 370 C530 395 505 430 495 465" />
            <path d="M785 350 C705 410 655 450 600 485 C555 515 530 540 508 575" />
            <path d="M735 445 C670 485 625 520 575 555 C545 575 520 595 500 615" />
            <path d="M508 500 C500 475 475 460 455 475 C442 486 445 510 458 528" />
            <path d="M508 575 C500 550 478 540 460 552 C447 562 450 585 462 600" />
            <path d="M500 615 C490 590 467 585 452 600 C442 611 447 635 460 647" />
          </g>
        </svg>
      </div>
    </div>
  )
}

"use client";

import { useEffect, useRef } from "react";

type Props = { vitality: number; active: boolean; seed: number };

export function GardenCanvas({ vitality, active, seed }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let frame = 0;
    let raf = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);

      const horizon = height * 0.66;
      const glow = context.createRadialGradient(width * .56, horizon * .5, 5, width * .56, horizon * .5, width * .55);
      glow.addColorStop(0, "rgba(236, 220, 160, .22)");
      glow.addColorStop(1, "rgba(236, 220, 160, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.strokeStyle = "rgba(210, 193, 140, .18)";
      context.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const y = horizon + i * 18;
        context.beginPath();
        context.moveTo(width * .08, y);
        context.quadraticCurveTo(width * .5, y - 24 - i * 2, width * .92, y + 3);
        context.stroke();
      }

      const plants = Math.max(5, Math.floor(vitality / 7));
      for (let i = 0; i < plants; i++) {
        const x = width * (.13 + ((i * 0.137 + seed * .031) % .76));
        const base = horizon + 32 + ((i * 29) % Math.max(40, height - horizon - 58));
        const sway = Math.sin(frame * .012 + i * 1.8) * (active ? 5 : 2);
        const h = 22 + ((i * 17 + vitality) % 72);
        context.strokeStyle = i % 3 === 0 ? "rgba(186, 111, 74, .8)" : "rgba(121, 145, 94, .78)";
        context.lineWidth = 1.4;
        context.beginPath();
        context.moveTo(x, base);
        context.quadraticCurveTo(x + sway, base - h * .55, x + sway * .45, base - h);
        context.stroke();
        context.fillStyle = i % 4 === 0 ? "rgba(220, 191, 112, .88)" : "rgba(155, 172, 116, .82)";
        context.beginPath();
        context.ellipse(x + sway * .45, base - h, 3.4 + i % 3, 7 + i % 5, sway * .02, 0, Math.PI * 2);
        context.fill();
      }

      context.fillStyle = "rgba(243, 233, 202, .72)";
      const particles = 18;
      for (let i = 0; i < particles; i++) {
        const px = (width * ((i * .193 + seed * .017) % 1) + frame * (active ? .12 : .035)) % width;
        const py = height * (.14 + ((i * .117) % .48)) + Math.sin(frame * .008 + i) * 7;
        context.globalAlpha = .15 + (i % 4) * .08;
        context.beginPath();
        context.arc(px, py, 1 + i % 2, 0, Math.PI * 2);
        context.fill();
      }
      context.globalAlpha = 1;
      frame += 1;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [active, seed, vitality]);

  return <canvas ref={ref} className="garden-canvas" aria-label="A procedural garden representing wallet activity" />;
}

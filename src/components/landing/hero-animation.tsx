"use client";

import { cn } from "@/lib/utils";

export default function HeroAnimation({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-square", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Flowing Lines */}
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={`line-${i}`}
            d={`M-50 ${20 + i * 36} Q 100 ${10 + i * 40}, 200 ${100 + Math.sin(i) * 20}`}
            stroke="hsl(var(--border))"
            strokeWidth="1"
            className="opacity-0"
            style={{
              animation: `flow-in 4s ease-out ${i * 0.2}s infinite`,
            }}
          />
        ))}

        {/* Document Outline */}
        <path
          d="M120 100 H 280 V 300 H 120 Z"
          stroke="hsl(var(--foreground))"
          strokeWidth="2"
          strokeDasharray="1000"
          className="opacity-0"
          style={{
            animation: `draw 5s ease-in-out 1s infinite`,
          }}
        />

        {/* Glowing Dots */}
        {Array.from({ length: 25 }).map((_, i) => (
          <circle
            key={`dot-${i}`}
            cx={130 + (i % 5) * 35 + Math.random() * 10}
            cy={110 + Math.floor(i / 5) * 38 + Math.random() * 10}
            r="3"
            className="opacity-0 glow-and-move"
            style={{
              fill: i % 3 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--mango))',
              animation: `glow-and-move 5s ease-in-out ${2 + i * 0.1}s infinite`,
              '--translate-y': `${Math.sin(i) * 50}px`
            } as React.CSSProperties}
          />
        ))}

        <style jsx>{`
          @keyframes flow-in {
            0% {
              stroke-dashoffset: 1000;
              opacity: 0;
            }
            50% {
              stroke-dashoffset: 0;
              opacity: 0.5;
            }
            100% {
              stroke-dashoffset: -1000;
              opacity: 0;
            }
          }
          @keyframes draw {
            0% {
              stroke-dashoffset: 1000;
              opacity: 0;
            }
            20%,
            60% {
              stroke-dashoffset: 0;
              opacity: 1;
            }
            80%,
            100% {
              stroke-dashoffset: -1000;
              opacity: 0;
            }
          }
          @keyframes glow-and-move {
            0%, 20% {
                opacity: 0;
                transform: translate(0,0);
            }
            50% {
                opacity: 1;
                transform: translate(0,0);
            }
            100% {
                opacity: 0;
                transform: translate(150px, var(--translate-y));
            }
          }
        `}</style>
      </svg>
    </div>
  );
}

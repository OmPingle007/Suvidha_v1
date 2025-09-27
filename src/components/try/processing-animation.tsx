// src/components/try/processing-animation.tsx
"use client";

import { FileScan } from 'lucide-react';

export default function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-8 bg-secondary/30 rounded-lg">
      <div className="relative w-24 h-24">
        <FileScan className="w-full h-full text-primary opacity-30" />
        <div 
          className="absolute top-0 left-0 w-full h-1 bg-primary rounded-full"
          style={{
            animation: 'scan 2s ease-in-out infinite',
          }}
        />
      </div>
      <p className="text-lg font-semibold text-foreground animate-pulse">
        Processing with AI...
      </p>
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0.5;
          }
          50% {
            transform: translateY(96px); // h-24 is 96px
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

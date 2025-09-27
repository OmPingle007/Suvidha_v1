'use client';

import { BrainCircuit } from 'lucide-react';

export default function ProcessingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
        <div className="absolute inset-2 bg-primary/20 rounded-full animate-pulse [animation-delay:0.2s]"></div>
        <div className="relative bg-background p-4 rounded-full shadow-md">
          <BrainCircuit className="w-10 h-10 text-primary" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground">AI is processing...</h3>
      <p className="text-sm text-muted-foreground">Extracting data from your document.</p>
    </div>
  );
}

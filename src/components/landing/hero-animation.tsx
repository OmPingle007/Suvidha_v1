"use client";

import { BrainCircuit, FileText, Database, Download, Sheet } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HeroAnimation({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full aspect-[4/3] bg-secondary/30 rounded-2xl p-4 sm:p-6 lg:p-8 overflow-hidden", className)}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lines */}
        <path d="M120 75 Q 170 90, 200 150" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4" className="path-animation" style={{ animationDelay: '0.5s' }} />
        <path d="M120 225 Q 170 210, 200 150" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4" className="path-animation" style={{ animationDelay: '0.7s' }} />
        <path d="M280 95 Q 230 110, 200 150" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4" className="path-animation" style={{ animationDelay: '0.9s' }} />
        <path d="M280 205 Q 230 190, 200 150" stroke="hsl(var(--border))" strokeWidth="1.5" strokeDasharray="4 4" className="path-animation" style={{ animationDelay: '1.1s' }} />

        {/* Dots on lines */}
        <circle cx="120" cy="75" r="3" fill="hsl(var(--primary))" className="dot-animation" style={{ animationDelay: '0.8s' }} />
        <circle cx="120" cy="225" r="3" fill="hsl(var(--primary))" className="dot-animation" style={{ animationDelay: '1s' }} />
        <circle cx="280" cy="95" r="3" fill="hsl(var(--primary))" className="dot-animation-reverse" style={{ animationDelay: '1.2s' }} />
        <circle cx="280" cy="205" r="3" fill="hsl(var(--primary))" className="dot-animation-reverse" style={{ animationDelay: '1.4s' }} />
        
        <style jsx>{`
          .path-animation, .dot-animation, .dot-animation-reverse {
            opacity: 0;
            animation: fade-in 1s ease-out forwards;
          }
          .dot-animation {
            animation: fade-in 1s ease-out forwards, move-dot 3s ease-in-out infinite;
          }
          .dot-animation-reverse {
             animation: fade-in 1s ease-out forwards, move-dot-reverse 3s ease-in-out infinite;
          }
          @keyframes fade-in {
            to { opacity: 1; }
          }
          @keyframes move-dot {
            0% { offset-distance: 0%; opacity: 1; }
            90% { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
           @keyframes move-dot-reverse {
            0% { offset-distance: 100%; opacity: 1; }
            90% { opacity: 1; }
            100% { offset-distance: 0%; opacity: 0; }
          }
          .dot-animation {
            offset-path: path('M120 75 Q 170 90, 200 150');
          }
          .dot-animation:nth-of-type(2) {
            offset-path: path('M120 225 Q 170 210, 200 150');
          }
          .dot-animation-reverse {
            offset-path: path('M280 95 Q 230 110, 200 150');
          }
          .dot-animation-reverse:nth-of-type(2) {
             offset-path: path('M280 205 Q 230 190, 200 150');
          }
        `}</style>
      </svg>
      
      {/* AI Processing */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 animate-fade-in" style={{animationDelay: '0.2s'}}>
        <div className="relative w-20 h-20 flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse"></div>
            <div className="absolute inset-2 bg-primary/20 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="relative bg-background p-3 rounded-full shadow-md">
                <BrainCircuit className="w-8 h-8 text-primary" />
            </div>
        </div>
        <p className="font-semibold text-xs sm:text-sm text-foreground">AI Processing</p>
      </div>

      {/* Upload Documents */}
      <div className="absolute top-1/2 left-[calc(15%)] -translate-y-1/2 flex flex-col items-center gap-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
        <div className="flex flex-col gap-4">
            <div className="bg-background p-4 rounded-lg shadow-md w-28 h-20 flex items-center justify-center animate-slide-up" style={{animationDelay: '0.6s'}}>
                <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
             <div className="bg-background p-4 rounded-lg shadow-md w-28 h-20 flex items-center justify-center animate-slide-up" style={{animationDelay: '0.8s'}}>
                <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
        </div>
        <p className="font-semibold text-xs sm:text-sm text-foreground">Upload Documents</p>
      </div>

      {/* Structured Data */}
       <div className="absolute top-1/2 right-[calc(15%)] -translate-y-1/2 flex flex-col items-center gap-4 animate-fade-in" style={{animationDelay: '0.5s'}}>
        <div className="bg-background p-4 rounded-lg shadow-md w-28 h-20 flex flex-col items-center justify-center gap-2 animate-slide-up" style={{animationDelay: '1s'}}>
          <div className="w-full h-2 bg-primary/50 rounded-full"/>
          <div className="w-full h-2 bg-primary/50 rounded-full"/>
          <div className="w-full h-2 bg-primary/50 rounded-full"/>
        </div>
        <div className="flex gap-2">
            <div className="bg-background p-2 rounded-lg shadow-md animate-slide-up" style={{animationDelay: '1.2s'}}><Sheet className="w-5 h-5 text-muted-foreground"/></div>
            <div className="bg-background p-2 rounded-lg shadow-md animate-slide-up" style={{animationDelay: '1.3s'}}><Database className="w-5 h-5 text-muted-foreground"/></div>
            <div className="bg-background p-2 rounded-lg shadow-md animate-slide-up" style={{animationDelay: '1.4s'}}><Download className="w-5 h-5 text-muted-foreground"/></div>
        </div>
        <p className="font-semibold text-xs sm:text-sm text-foreground">Structured Data</p>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-primary"><path d="M12 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/><path d="M12 8V3"/><path d="M18.42 12.61a2.1 2.1 0 1 1 2.97 2.97L16.5 21l-3.35-3.35L18.42 12.61Z"/></svg>
        <span className="text-xl font-bold text-foreground">Suvidha OCR</span>
    </div>
  );
}

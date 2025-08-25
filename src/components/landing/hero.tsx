import Link from "next/link";
import { Button } from "@/components/ui/button";
import HeroAnimation from "./hero-animation";

export default function Hero() {
  return (
    <section className="w-full pt-24 md:pt-32 lg:pt-40">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                ✨ AI-Powered OCR Technology
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
                Unlock Your <span className="text-primary">Paperwork</span> Potential.
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                The intelligent OCR for Indian MSMEs. Effortlessly extract data from GST invoices, e-way bills, and bank statements in seconds. No more manual entry.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="#waitlist">Join the Early Access Waitlist</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#solution">See How It Works</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <HeroAnimation className="w-full max-w-lg h-auto" />
          </div>
        </div>
      </div>
    </section>
  );
}

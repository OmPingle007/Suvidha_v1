import Header from '@/components/landing/header';
import Hero from '@/components/landing/hero';
import ProblemSection from '@/components/landing/problem-section';
import SolutionSection from '@/components/landing/solution-section';
import UseCasesSection from '@/components/landing/use-cases-section';
import CtaSection from '@/components/landing/cta-section';
import Footer from '@/components/landing/footer';
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <UseCasesSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const problems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary animate-spin" style={{ animationDuration: '10s' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
    ),
    title: "Wasted Hours",
    description: "Your team spends countless hours on repetitive typing.",
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground animate-glitch"><path d="M20 7h-5"/><path d="M15 7v10h5"/><path d="M10 7v10h5"/></svg>
    ),
    title: "Costly Errors",
    description: "Manual entry leads to human errors that impact your finances.",
  },
  {
    icon: (
       <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-mango"><path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22"/><path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2"/></svg>
    ),
    title: "Delayed Growth",
    description: "Slow processes mean delayed payments and slower decisions.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              Manual data entry is holding you back.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Stop letting tedious paperwork slow you down. Suvidha OCR automates the mundane, so you can focus on what truly matters.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          {problems.map((problem, index) => (
            <Card key={index} className="text-center animate-slide-up opacity-0" style={{animationDelay: `${index * 200}ms`, animationFillMode: 'forwards'}}>
              <CardHeader className="items-center">
                {problem.icon}
                <CardTitle>{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

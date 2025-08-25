import { Upload, Cpu, FileOutput } from 'lucide-react';

export default function SolutionSection() {
  return (
    <section id="solution">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              Suvidha OCR: Your 24/7 Digital Clerk
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our three-step process is designed for simplicity and speed.
            </p>
          </div>
        </div>
        <div className="grid gap-12 lg:gap-16">
          {/* Step 1 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-start space-y-4">
              <span className="text-6xl font-extrabold text-muted">01</span>
              <h3 className="text-2xl font-bold">Upload</h3>
              <p className="text-muted-foreground">
                Scan or upload any document. From a crisp PDF to a photo of a crumpled bill, our AI can handle it.
              </p>
            </div>
            <div className="w-full h-48 bg-secondary rounded-lg flex items-center justify-center">
                <Upload className="w-16 h-16 text-primary" />
            </div>
          </div>
          {/* Step 2 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
             <div className="w-full h-48 bg-secondary rounded-lg flex items-center justify-center order-last md:order-first">
                <Cpu className="w-16 h-16 text-primary" />
            </div>
            <div className="flex flex-col items-start space-y-4 md:items-end md:text-right">
              <span className="text-6xl font-extrabold text-muted">02</span>
              <h3 className="text-2xl font-bold">AI Extraction</h3>
              <p className="text-muted-foreground">
                Our AI, trained on millions of Indian documents, reads and structures the data in real-time.
              </p>
            </div>
          </div>
          {/* Step 3 */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-start space-y-4">
              <span className="text-6xl font-extrabold text-muted">03</span>
              <h3 className="text-2xl font-bold">Integrate</h3>
              <p className="text-muted-foreground">
                Export your data to Tally, Excel, or any software you use with a single click.
              </p>
            </div>
            <div className="w-full h-48 bg-secondary rounded-lg flex items-center justify-center">
                <FileOutput className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { FileCheck, ClipboardList, Landmark, ReceiptText, Truck, UserSquare, IndianRupee } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const useCases = [
  { icon: ReceiptText, name: "GST Invoices" },
  { icon: Truck, name: "e-Way Bills" },
  { icon: UserSquare, name: "Aadhaar & PAN Cards" },
  { icon: Landmark, name: "Bank Statements" },
  { icon: ClipboardList, name: "Purchase Orders" },
  { icon: IndianRupee, name: "Cheques" },
  { icon: FileCheck, name: "KYC Documents" },
  { icon: FileCheck, name: "And more..." },
];

export default function UseCasesSection() {
  return (
    <section className="bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground">
              Built for the Documents That Run Your Business.
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We've specifically trained our AI to understand the nuances of Indian business documents.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {useCases.map((useCase, index) => (
            <Card key={index} className="group transition-all hover:bg-primary/5 hover:border-primary/50">
              <CardContent className="flex flex-col items-center justify-center p-6 gap-4">
                <useCase.icon className="w-10 h-10 text-muted-foreground transition-colors group-hover:text-primary" />
                <span className="text-sm font-medium text-center text-muted-foreground transition-colors group-hover:text-primary">{useCase.name}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

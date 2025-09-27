// src/components/try/results-display.tsx
"use client";

import { SuvidhaOcrOutput } from "@/ai/flows/suvidha-ocr-flow";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResultsDisplayProps {
  result: SuvidhaOcrOutput;
}

const copyToClipboard = (text: string, toast: any) => {
  navigator.clipboard.writeText(text).then(() => {
    toast({
      title: "Copied to clipboard!",
      description: "The data has been copied successfully.",
    });
  }).catch(err => {
    console.error('Failed to copy text: ', err);
    toast({
      variant: "destructive",
      title: "Copy Failed",
      description: "Could not copy data to clipboard.",
    });
  });
};

const downloadFile = (content: string, filename: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export default function ResultsDisplay({ result }: ResultsDisplayProps) {
    const { toast } = useToast();

    if (!result) return null;

    const { processedData, format, originalFilename } = result;

    const downloadJson = () => downloadFile(JSON.stringify(processedData, null, 2), `${originalFilename}.json`, 'application/json');
    const downloadText = () => downloadFile(processedData as string, `${originalFilename}.txt`, 'text/plain');
    const downloadCsv = () => downloadFile(processedData as string, `${originalFilename}.csv`, 'text/csv');

    const renderContent = () => {
        switch (format) {
            case 'json':
                const jsonString = JSON.stringify(processedData, null, 2);
                return (
                    <div className="relative">
                        <pre className="bg-secondary/50 p-4 rounded-lg text-left overflow-auto max-h-[500px] text-sm">
                            <code>{jsonString}</code>
                        </pre>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => copyToClipboard(jsonString, toast)}><Copy className="h-4 w-4" /></Button>
                    </div>
                );
            case 'text':
                const textContent = processedData as string;
                return (
                     <div className="relative">
                        <pre className="bg-secondary/50 p-4 rounded-lg text-left overflow-auto max-h-[500px] text-sm whitespace-pre-wrap">
                            {textContent}
                        </pre>
                         <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => copyToClipboard(textContent, toast)}><Copy className="h-4 w-4" /></Button>
                    </div>
                );
            case 'csv':
                const csvContent = processedData as string;
                const rows = csvContent.split('\n').map(row => row.split(','));
                const header = rows[0];
                const body = rows.slice(1);
                 return (
                     <div className="relative">
                        <div className="bg-secondary/50 p-4 rounded-lg text-left overflow-auto max-h-[500px] text-sm">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b">
                                        {header.map((cell, i) => <th key={i} className="p-2 font-semibold text-left">{cell}</th>)}
                                    </tr>
                                </thead>
                                <tbody>
                                    {body.map((row, i) => (
                                        <tr key={i} className="border-b">
                                            {row.map((cell, j) => <td key={j} className="p-2">{cell}</td>)}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8" onClick={() => copyToClipboard(csvContent, toast)}><Copy className="h-4 w-4" /></Button>
                    </div>
                );
            default:
                return <p>Unsupported format</p>;
        }
    };

    const handleDownload = () => {
         switch (format) {
            case 'json':
                downloadJson();
                break;
            case 'text':
                downloadText();
                break;
            case 'csv':
                downloadCsv();
                break;
        }
    }

  return (
    <div className="w-full space-y-4">
        {renderContent()}
        <Button onClick={handleDownload} className="w-full" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download {format.toUpperCase()}
        </Button>
    </div>
  );
}

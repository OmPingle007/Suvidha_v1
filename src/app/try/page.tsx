'use client';

import { useState, useCallback, useTransition } from 'react';
import { useDropzone } from 'react-dropzone';
import { processDocument, ProcessedData } from '@/ai/flows/suvidha-ocr-flow';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { UploadCloud, File as FileIcon, Loader2, Download, AlertCircle, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/landing/logo';
import ResultsDisplay from '@/components/try/results-display';
import ProcessingAnimation from '@/components/try/processing-animation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type OutputFormat = 'json' | 'text' | 'csv';

export default function TryNowPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('json');
  const [isPending, startTransition] = useTransition();
  const [processedData, setProcessedData] = useState<ProcessedData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      setProcessedData(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  });

  const handleProcess = () => {
    if (!file) {
      setError('Please upload a file first.');
      return;
    }
    setError(null);
    setProcessedData(null);

    startTransition(async () => {
      try {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          const base64File = reader.result as string;
          const result = await processDocument({
            fileDataUri: base64File,
            outputFormat,
          });
          setProcessedData(result);
        };
      } catch (e: any) {
        console.error(e);
        if (e.message.includes('Service Unavailable') || e.message.includes('overloaded')) {
          setError('The AI service is currently busy. Please try again in a moment.');
        } else if (e.message.includes('permission') || e.message.includes('API key')) {
           setError('There seems to be an issue with authentication. Please check the API key configuration.');
        }
        else {
          setError('An unexpected error occurred during processing. Please try again.');
        }
      }
    });
  };

  const clearFile = () => {
    setFile(null);
    setProcessedData(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-secondary/20">
      <header className="px-4 lg:px-6 h-16 flex items-center fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
           <Button asChild variant="outline">
            <Link href="/#waitlist">Join Waitlist</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl text-foreground">
              Try SuvidhaOCR Now
            </h1>
            <p className="max-w-[600px] mx-auto mt-4 text-muted-foreground md:text-xl">
              Upload your document, select an output format, and let our AI do the work.
            </p>
          </div>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Side: Upload & Options */}
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">1. Upload Document</h3>
                    <div
                      {...getRootProps()}
                      className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                        isDragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <input {...getInputProps()} />
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <UploadCloud className="w-10 h-10" />
                        {isDragActive ? (
                          <p>Drop the file here ...</p>
                        ) : (
                          <p>Drag & drop a file here, or click to select</p>
                        )}
                        <p className="text-xs">(PDF, PNG, JPG)</p>
                      </div>
                    </div>
                  </div>

                  {file && (
                    <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileIcon className="w-6 h-6 text-primary" />
                        <span className="font-medium text-sm truncate">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="icon" onClick={clearFile} className="h-8 w-8">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold mb-2">2. Select Output Format</h3>
                    <Select
                      value={outputFormat}
                      onValueChange={(value) => setOutputFormat(value as OutputFormat)}
                      disabled={isPending}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="json">Structured JSON</SelectItem>
                        <SelectItem value="text">Plain Text</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleProcess} disabled={!file || isPending} size="lg">
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Process Document'
                    )}
                  </Button>
                </div>

                {/* Right Side: Output */}
                <div className="flex flex-col">
                   <h3 className="text-lg font-semibold mb-2">3. Extracted Data</h3>
                   <div className="bg-secondary/50 rounded-lg flex-1 flex items-center justify-center p-4 min-h-[300px]">
                      {isPending ? (
                        <ProcessingAnimation />
                      ) : error ? (
                         <Alert variant="destructive" className="max-w-md">
                          <AlertCircle className="h-4 w-4" />
                          <AlertTitle>Processing Failed</AlertTitle>
                          <AlertDescription>{error}</AlertDescription>
                        </Alert>
                      ) : processedData ? (
                        <ResultsDisplay data={processedData} fileName={file?.name.split('.')[0] || 'output'}/>
                      ) : (
                        <div className="text-center text-muted-foreground">
                          <p>Your extracted data will appear here.</p>
                        </div>
                      )}
                   </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

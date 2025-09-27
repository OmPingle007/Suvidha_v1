// src/app/try/page.tsx
"use client";

import { useState } from 'react';
import Header from '@/components/landing/header';
import Footer from '@/components/landing/footer';
import DocumentUploader from '@/components/try/document-uploader';
import OutputSelector, { OutputFormat } from '@/components/try/output-selector';
import ResultsDisplay from '@/components/try/results-display';
import { Button } from '@/components/ui/button';
import { suvidhaOcrFlow } from '@/ai/flows/suvidha-ocr-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { SuvidhaOcrOutput } from '@/ai/flows/suvidha-ocr-flow';
import ProcessingAnimation from '@/components/try/processing-animation';

export default function TryItNowPage() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('json');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SuvidhaOcrOutput | null>(null);

  const handleFileChange = (selectedFile: File | null) => {
    setFile(selectedFile);
    setResult(null); 
    setError(null);
  };

  const handleProcess = async () => {
    if (!file) {
      setError('Please upload a document first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        try {
          const documentDataUri = reader.result as string;
          const response = await suvidhaOcrFlow({
            documentDataUri,
            outputFormat,
            filename: file.name,
          });
          setResult(response);
        } catch (e: any) {
            console.error(e);
            if (e.message && e.message.includes('503 Service Unavailable')) {
                setError('The AI service is currently busy or unavailable. Please try again in a few moments.');
            } else if (e.message && e.message.includes('404 Not Found')) {
                setError('The configured AI model was not found. Please contact support.');
            }
             else {
                setError('An unexpected error occurred during processing. Please check the console for details.');
            }
        } finally {
            setIsLoading(false);
        }
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        setError('Failed to read the file.');
        setIsLoading(false);
      };
    } catch (e) {
      console.error(e);
      setError('An unexpected error occurred before processing.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 md:pt-32 lg:pt-40">
        <section>
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl text-foreground">
                Try SuvidhaOCR Now
              </h1>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                Upload a document, choose your desired output, and let our AI do the rest. Experience the power of intelligent document processing firsthand.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mt-12 space-y-8">
              {!isLoading && !result && (
                <>
                  <DocumentUploader onFileChange={handleFileChange} isProcessing={isLoading} />
                  <OutputSelector
                    onFormatChange={setOutputFormat}
                    currentFormat={outputFormat}
                    isDisabled={isLoading}
                  />
                  <Button
                    size="lg"
                    className="w-full h-12 text-base"
                    onClick={handleProcess}
                    disabled={isLoading || !file}
                  >
                    {isLoading ? 'Processing with AI...' : 'Process Document'}
                  </Button>
                </>
              )}

              {error && (
                 <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {isLoading && <ProcessingAnimation />}

              {result && (
                <div className="mt-8 space-y-6">
                  <h2 className="text-2xl font-bold tracking-tight text-center">
                    Extracted Data
                  </h2>
                  <ResultsDisplay result={result} />
                   <Button
                    size="lg"
                    className="w-full h-12 text-base"
                    onClick={() => {
                        setFile(null);
                        setResult(null);
                        setError(null);
                    }}
                  >
                    Process Another Document
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

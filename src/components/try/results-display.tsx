'use client';

import { ProcessedData } from '@/ai/flows/suvidha-ocr-flow';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ResultsDisplayProps {
  data: ProcessedData;
  fileName: string;
}

export default function ResultsDisplay({ data, fileName }: ResultsDisplayProps) {
  
  const downloadFile = (content: string, fileType: 'json' | 'txt' | 'csv') => {
    const mimeType = {
        json: 'application/json',
        txt: 'text/plain',
        csv: 'text/csv'
    }[fileType];

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.${fileType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const renderJson = () => {
    if (data.format !== 'json' || typeof data.data !== 'object' || !data.data) {
      return null;
    }
    const jsonData = data.data as { keyValuePairs?: any, tables?: any[], fullText?: string };
    const jsonString = JSON.stringify(jsonData, null, 2);

    return (
        <div className="w-full">
            <div className="flex justify-end mb-2">
                 <Button variant="ghost" size="sm" onClick={() => downloadFile(jsonString, 'json')}>
                    <Download className="mr-2 h-4 w-4"/>
                    Download JSON
                </Button>
            </div>
            <pre className="bg-background/50 p-4 rounded-md text-xs overflow-auto max-h-[400px]">
                <code>{jsonString}</code>
            </pre>
        </div>
    )
  };

  const renderText = () => {
    if(data.format !== 'text' || typeof data.data !== 'string') return null;
    return (
        <div className="w-full">
            <div className="flex justify-end mb-2">
                 <Button variant="ghost" size="sm" onClick={() => downloadFile(data.data as string, 'txt')}>
                    <Download className="mr-2 h-4 w-4"/>
                    Download Text
                </Button>
            </div>
            <div className="bg-background/50 p-4 rounded-md text-sm whitespace-pre-wrap break-words overflow-auto max-h-[400px]">
                {data.data}
            </div>
        </div>
    )
  };

  const parseCsv = (csvString: string) => {
    const rows = csvString.trim().split('\n').map(row => row.split(','));
    return rows.filter(row => row.length > 1 && row.some(cell => cell.trim() !== ''));
  };

  const renderCsv = () => {
     if(data.format !== 'csv' || typeof data.data !== 'string' || !data.data.trim()) {
        return <p className="text-sm text-muted-foreground">No tabular data found to display as CSV.</p>
     };
    const tableData = parseCsv(data.data);
    if(tableData.length < 1) return <p className="text-sm text-muted-foreground">No tabular data found to display as CSV.</p>;
    const header = tableData[0];
    const body = tableData.slice(1);

    return (
         <div className="w-full">
             <div className="flex justify-end mb-2">
                 <Button variant="ghost" size="sm" onClick={() => downloadFile(data.data as string, 'csv')}>
                    <Download className="mr-2 h-4 w-4"/>
                    Download CSV
                </Button>
            </div>
            <div className="overflow-auto border rounded-md max-h-[400px]">
            <Table>
                <TableHeader>
                    <TableRow>
                        {header.map((col, i) => <TableHead key={i}>{col}</TableHead>)}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row, i) => (
                        <TableRow key={i}>
                            {row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </div>
    )
  };


  return (
    <div className="w-full animate-fade-in">
        {data.format === 'json' ? renderJson() : 
         data.format === 'text' ? renderText() :
         data.format === 'csv' ? renderCsv() : null}
    </div>
  );
}

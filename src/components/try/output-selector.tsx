// src/components/try/output-selector.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export type OutputFormat = 'json' | 'text' | 'csv';

interface OutputSelectorProps {
  onFormatChange: (format: OutputFormat) => void;
  currentFormat: OutputFormat;
  isDisabled: boolean;
}

export default function OutputSelector({ onFormatChange, currentFormat, isDisabled }: OutputSelectorProps) {
  return (
    <div className="grid gap-2">
       <Label htmlFor="output-format" className="text-base font-medium text-left">Choose Output Format</Label>
       <Select
        value={currentFormat}
        onValueChange={(value: OutputFormat) => onFormatChange(value)}
        disabled={isDisabled}
      >
        <SelectTrigger id="output-format" className="h-12 text-base">
          <SelectValue placeholder="Select an output format" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="json">Structured JSON</SelectItem>
          <SelectItem value="text">Plain Text</SelectItem>
          <SelectItem value="csv">CSV</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

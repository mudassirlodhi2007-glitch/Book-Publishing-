import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface SqlCodeBlockProps {
  code: string;
  label?: string;
  maxHeight?: string;
}

export function SqlCodeBlock({ code, label = 'Oracle SQL', maxHeight }: SqlCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Fallback for restricted clipboard contexts
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="border border-[#E5DFD3] rounded-lg overflow-hidden bg-white print-avoid-break">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#F3EFE7] border-b border-[#E5DFD3]">
        <span className="text-xs font-medium tracking-wide text-[#57534E] font-mono">
          {label}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="no-print inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#1C1917] bg-white border border-[#D6CEBE] rounded hover:border-[#1E3A8A] hover:text-[#1E3A8A] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#14532D]" />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy SQL</span>
            </>
          )}
        </button>
      </div>
      <pre
        style={maxHeight ? { maxHeight } : undefined}
        className="p-4 overflow-x-auto overflow-y-auto text-[13px] leading-relaxed font-mono text-[#1C1917] bg-[#FDFCFA]"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

interface DataTableProps {
  columns: string[];
  rows: (string | number)[][];
  caption?: string;
}

export function DataTable({ columns, rows, caption }: DataTableProps) {
  return (
    <div className="border border-[#E5DFD3] rounded-lg overflow-hidden bg-white print-avoid-break">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[#F3EFE7] border-b border-[#E5DFD3]">
              {columns.map((col) => (
                <th
                  key={col}
                  className="px-4 py-2.5 text-xs font-semibold tracking-wider text-[#44403C] font-mono whitespace-nowrap"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EFECE4]">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-[#FBF9F5] transition-colors">
                {row.map((cell, cIdx) => {
                  const isNumeric =
                    typeof cell === 'number' ||
                    (typeof cell === 'string' && /^\d+(\.\d+)?$/.test(cell));
                  return (
                    <td
                      key={cIdx}
                      className={`px-4 py-2.5 text-[13px] text-[#1C1917] whitespace-nowrap ${
                        isNumeric ? 'font-mono tabular-nums text-[#1E3A8A]' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <div className="px-4 py-2 bg-[#FAF8F3] border-t border-[#E5DFD3] text-xs text-[#57534E] font-mono tabular-nums">
          {caption}
        </div>
      )}
    </div>
  );
}

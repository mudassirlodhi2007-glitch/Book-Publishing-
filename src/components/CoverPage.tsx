import { useState } from 'react';
import { Edit3, RotateCcw } from 'lucide-react';

export interface GroupMember {
  name: string;
  rollNo: string;
}

export interface CoverDetails {
  collegeName: string;
  department: string;
  academicYear: string;
  facultyName: string;
  members: GroupMember[];
}

export const DEFAULT_COVER_DETAILS: CoverDetails = {
  collegeName: '[Name of Your Engineering / Degree College]',
  department: 'Department of Computer Science & Engineering',
  academicYear: '2025 – 2026',
  facultyName: '[Prof. / Dr. Faculty Guide Name]',
  members: [
    { name: '[Student Member 1 Name]', rollNo: '[Roll No. 01]' },
    { name: '[Student Member 2 Name]', rollNo: '[Roll No. 02]' },
    { name: '[Student Member 3 Name]', rollNo: '[Roll No. 03]' },
    { name: '[Student Member 4 Name]', rollNo: '[Roll No. 04]' },
    { name: '[Student Member 5 Name]', rollNo: '[Roll No. 05]' },
    { name: '[Student Member 6 Name]', rollNo: '[Roll No. 06]' },
  ],
};

interface CoverPageProps {
  details: CoverDetails;
  onChange: (updated: CoverDetails) => void;
}

export function CoverPage({ details, onChange }: CoverPageProps) {
  const [editing, setEditing] = useState(false);

  const updateMember = (idx: number, field: keyof GroupMember, value: string) => {
    const nextMembers = details.members.map((m, i) =>
      i === idx ? { ...m, [field]: value } : m
    );
    onChange({ ...details, members: nextMembers });
  };

  return (
    <section id="sec-1" className="scroll-mt-24 print-break-after">
      <div className="flex items-center justify-between gap-4 mb-4 no-print">
        <span className="text-xs font-medium tracking-widest uppercase text-[#57534E]">
          Section 01 · Formal Academic Cover Page
        </span>
        <div className="flex items-center gap-2">
          {editing && (
            <button
              type="button"
              onClick={() => onChange(DEFAULT_COVER_DETAILS)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#57534E] bg-white border border-[#D6CEBE] rounded-md hover:text-[#1C1917] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Placeholders</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1E3A8A] bg-white border border-[#1E3A8A]/30 rounded-md hover:bg-[#1E3A8A]/5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{editing ? 'Done Editing' : 'Fill Cover Details'}</span>
          </button>
        </div>
      </div>

      {editing && (
        <div className="mb-6 p-5 bg-[#F3EFE7] border border-[#D6CEBE] rounded-lg no-print">
          <p className="text-xs font-medium text-[#44403C] mb-4">
            Customize the institution, faculty, and group member details below before printing or exporting to PDF.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <label className="block">
              <span className="block text-xs font-medium text-[#57534E] mb-1">College / Institution Name</span>
              <input
                type="text"
                value={details.collegeName}
                onChange={(e) => onChange({ ...details, collegeName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CEBE] rounded focus:outline-none focus:border-[#1E3A8A]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-[#57534E] mb-1">Department</span>
              <input
                type="text"
                value={details.department}
                onChange={(e) => onChange({ ...details, department: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CEBE] rounded focus:outline-none focus:border-[#1E3A8A]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-[#57534E] mb-1">Academic Year</span>
              <input
                type="text"
                value={details.academicYear}
                onChange={(e) => onChange({ ...details, academicYear: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CEBE] rounded focus:outline-none focus:border-[#1E3A8A]"
              />
            </label>
            <label className="block">
              <span className="block text-xs font-medium text-[#57534E] mb-1">Faculty Guide Name</span>
              <input
                type="text"
                value={details.facultyName}
                onChange={(e) => onChange({ ...details, facultyName: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CEBE] rounded focus:outline-none focus:border-[#1E3A8A]"
              />
            </label>
          </div>
          <div>
            <span className="block text-xs font-medium text-[#57534E] mb-2">Group Members & Roll Numbers (6 Members)</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {details.members.map((member, idx) => (
                <div key={idx} className="grid grid-cols-[1fr_130px] gap-2">
                  <input
                    type="text"
                    value={member.name}
                    onChange={(e) => updateMember(idx, 'name', e.target.value)}
                    placeholder={`Member ${idx + 1} Name`}
                    className="px-3 py-1.5 text-sm bg-white border border-[#D6CEBE] rounded focus:outline-none focus:border-[#1E3A8A]"
                  />
                  <input
                    type="text"
                    value={member.rollNo}
                    onChange={(e) => updateMember(idx, 'rollNo', e.target.value)}
                    placeholder="Roll No."
                    className="px-3 py-1.5 text-sm font-mono bg-white border border-[#D6CEBE] rounded focus:outline-none focus:border-[#1E3A8A]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Formal Academic Sheet */}
      <div className="bg-white border border-[#D6CEBE] rounded-lg p-8 md:p-14 text-center">
        <div className="border border-[#E5DFD3] p-6 md:p-12">
          <p className="text-xs font-semibold tracking-[0.18em] uppercase text-[#57534E]">
            {details.collegeName}
          </p>
          <p className="text-sm font-medium text-[#1C1917] mt-1.5">
            {details.department}
          </p>
          <p className="text-xs text-[#57534E] mt-1 font-mono tabular-nums">
            Academic Year: {details.academicYear}
          </p>

          <div className="my-8 border-t border-b border-[#E5DFD3] py-8">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#1E3A8A] mb-3">
              Database Management System (DBMS) · Practical Case Study Report
            </p>
            <p className="text-sm font-mono font-medium text-[#57534E] mb-3">
              EXPERIMENT NUMBER: 10
            </p>
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-[#1C1917] tracking-tight text-balance">
              Book Publishing Company
            </h1>
            <p className="mt-4 text-sm md:text-base text-[#57534E] max-w-xl mx-auto leading-relaxed">
              Relational Database Design, Entity-Relationship Modeling, Normalization (1NF–3NF), and Oracle SQL Implementation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-2xl mx-auto mb-8">
            <div className="p-4 bg-[#FBF9F5] border border-[#E5DFD3] rounded">
              <p className="text-xs uppercase tracking-wider text-[#57534E] font-medium">Subject</p>
              <p className="text-sm font-semibold text-[#1C1917] mt-1">
                Database Management System (DBMS)
              </p>
            </div>
            <div className="p-4 bg-[#FBF9F5] border border-[#E5DFD3] rounded">
              <p className="text-xs uppercase tracking-wider text-[#57534E] font-medium">Submitted To (Faculty Guide)</p>
              <p className="text-sm font-semibold text-[#1C1917] mt-1">
                {details.facultyName}
              </p>
            </div>
          </div>

          <div className="max-w-2xl mx-auto text-left">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-3">
              Submitted By (Group Members)
            </p>
            <div className="border border-[#E5DFD3] rounded overflow-hidden">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#F3EFE7] border-b border-[#E5DFD3]">
                    <th className="px-4 py-2 text-xs font-semibold text-[#44403C] w-14">Sr.</th>
                    <th className="px-4 py-2 text-xs font-semibold text-[#44403C]">Student Name</th>
                    <th className="px-4 py-2 text-xs font-semibold text-[#44403C] w-40">Roll Number</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {details.members.map((m, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 text-xs font-mono tabular-nums text-[#57534E]">
                        {String(idx + 1).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-2 text-sm text-[#1C1917] font-medium">{m.name}</td>
                      <td className="px-4 py-2 text-sm font-mono tabular-nums text-[#1E3A8A]">{m.rollNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

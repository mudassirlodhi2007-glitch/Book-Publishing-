import { useState } from 'react';
import { Download, Printer, BookOpen, FileCode2, Camera } from 'lucide-react';
import {
  AUTHORS,
  BOOKS,
  BOOK_AUTHORS,
  BOOK_EDITORS,
  EDITORS,
  ENTITIES_SPEC,
  FULL_ORACLE_SCRIPT,
  ORACLE_DDL_SQL,
  ORACLE_DML_SQL,
  PUBLISHERS,
  SQL_QUERIES,
  SUBJECTS,
  VIVA_QUESTIONS,
} from './data/dbmsData';
import { CoverDetails, CoverPage, DEFAULT_COVER_DETAILS } from './components/CoverPage';
import { ERDiagram } from './components/ERDiagram';
import { SqlCodeBlock } from './components/SqlCodeBlock';
import { DataTable } from './components/DataTable';

const TOC_ITEMS = [
  { id: 'sec-1', num: '01', label: 'Cover Page' },
  { id: 'sec-2', num: '02', label: 'Problem Statement' },
  { id: 'sec-3', num: '03', label: 'Objectives' },
  { id: 'sec-4', num: '04', label: 'Data Requirements' },
  { id: 'sec-5', num: '05', label: 'Entities & Attributes' },
  { id: 'sec-6', num: '06', label: 'E-R Diagram' },
  { id: 'sec-7', num: '07', label: 'Relationships & Cardinalities' },
  { id: 'sec-8', num: '08', label: 'Normalization (1NF–3NF)' },
  { id: 'sec-9', num: '09', label: 'Relational Schema' },
  { id: 'sec-10', num: '10', label: 'SQL Table Creation' },
  { id: 'sec-11', num: '11', label: 'SQL Insert Data' },
  { id: 'sec-12', num: '12', label: '15 SQL Queries & Outputs' },
  { id: 'sec-13', num: '13', label: 'Testing & Screenshots' },
  { id: 'sec-14', num: '14', label: 'Conclusion' },
  { id: 'sec-15', num: '15', label: 'References' },
  { id: 'sec-16', num: '16', label: '20 Viva Questions' },
];

function SectionHeader({
  num,
  title,
  subtitle,
}: {
  num: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-6 pb-3 border-b border-[#D6CEBE]">
      <p className="text-xs font-semibold tracking-widest uppercase text-[#1E3A8A] font-mono tabular-nums">
        Section {num}
      </p>
      <h2 className="text-2xl md:text-3xl font-display font-semibold text-[#1C1917] mt-1 text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-[#57534E] mt-1.5 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default function App() {
  const [coverDetails, setCoverDetails] = useState<CoverDetails>(DEFAULT_COVER_DETAILS);
  const [activeEntityTab, setActiveEntityTab] = useState<string>('all');
  const [vivaFilter, setVivaFilter] = useState<string>('All');

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSql = () => {
    const blob = new Blob([FULL_ORACLE_SCRIPT], { type: 'text/sql;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'experiment_10_book_publishing_oracle.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const vivaTopics = ['All', ...Array.from(new Set(VIVA_QUESTIONS.map((q) => q.topic)))];
  const filteredViva =
    vivaFilter === 'All'
      ? VIVA_QUESTIONS
      : VIVA_QUESTIONS.filter((q) => q.topic === vivaFilter);

  const visibleEntities =
    activeEntityTab === 'all'
      ? ENTITIES_SPEC
      : ENTITIES_SPEC.filter((e) => e.id === activeEntityTab);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917]">
      {/* TOP BAR CONTRACT: 3 zones separated by gap-8 */}
      <header className="no-print sticky top-0 z-30 bg-[#FBF9F5]/95 backdrop-blur-sm border-b border-[#E5DFD3]">
        <div className="max-w-[1400px] mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#sec-1"
            className="text-lg font-display font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            Experiment 10 · DBMS
          </a>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#57534E]">
            <a href="#sec-1" className="hover:text-[#1E3A8A] transition-colors whitespace-nowrap shrink-0">
              Cover & Scope
            </a>
            <a href="#sec-6" className="hover:text-[#1E3A8A] transition-colors whitespace-nowrap shrink-0">
              ER & Schema
            </a>
            <a href="#sec-8" className="hover:text-[#1E3A8A] transition-colors whitespace-nowrap shrink-0">
              Normalization
            </a>
            <a href="#sec-10" className="hover:text-[#1E3A8A] transition-colors whitespace-nowrap shrink-0">
              Oracle SQL
            </a>
            <a href="#sec-16" className="hover:text-[#1E3A8A] transition-colors whitespace-nowrap shrink-0">
              Viva Prep
            </a>
          </nav>

          {/* Zone 3: 1 primary action button */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#1E3A8A] rounded-md hover:bg-[#172D6E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT: Sticky Left Index + Editorial Report Column */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 print-full-width">
        {/* Sidebar Table of Contents */}
        <aside className="no-print hidden lg:block">
          <div className="sticky top-24 border border-[#E5DFD3] rounded-lg bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#57534E] mb-3 px-2">
              Report Index
            </p>
            <nav className="space-y-0.5 max-h-[calc(100vh-220px)] overflow-y-auto pr-1">
              {TOC_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-2.5 px-2 py-1.5 text-xs font-medium text-[#44403C] rounded hover:bg-[#F3EFE7] hover:text-[#1E3A8A] transition-colors"
                >
                  <span className="font-mono tabular-nums text-[#78716C] w-5 shrink-0">
                    {item.num}
                  </span>
                  <span className="truncate">{item.label}</span>
                </a>
              ))}
            </nav>
            <div className="mt-4 pt-3 border-t border-[#E5DFD3]">
              <button
                type="button"
                onClick={handleDownloadSql}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#1E3A8A] bg-[#F3EFE7] border border-[#D6CEBE] rounded hover:bg-[#EBE5D9] transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .sql Script</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Report Body */}
        <main className="max-w-4xl w-full space-y-16 print-full-width">
          {/* Quick Utility Strip on Mobile/Tablet */}
          <div className="no-print flex flex-wrap items-center justify-between gap-4 p-4 bg-white border border-[#E5DFD3] rounded-lg lg:hidden">
            <div className="flex items-center gap-2 text-xs text-[#57534E]">
              <BookOpen className="w-4 h-4 text-[#1E3A8A]" />
              <span>16 Complete Report Sections · Oracle SQL Ready</span>
            </div>
            <button
              type="button"
              onClick={handleDownloadSql}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#1E3A8A] bg-[#F3EFE7] border border-[#D6CEBE] rounded hover:bg-[#EBE5D9] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .sql Script</span>
            </button>
          </div>

          {/* ============================================================== */}
          {/* 1. COVER PAGE                                                  */}
          {/* ============================================================== */}
          <CoverPage details={coverDetails} onChange={setCoverDetails} />

          {/* ============================================================== */}
          {/* 2. PROBLEM STATEMENT                                           */}
          {/* ============================================================== */}
          <section id="sec-2" className="scroll-mt-24">
            <SectionHeader
              num="02"
              title="Problem Statement"
              subtitle="Understanding the operational challenges of a scientific book publishing company."
            />
            <div className="space-y-4 text-[15px] leading-[1.75] text-[#292524] max-w-prose">
              <p>
                A scientific book publishing company produces academic textbooks, monographs, and reference volumes across multiple technical and scientific subjects such as Database Systems, Artificial Intelligence, Quantum Physics, Organic Chemistry, and Molecular Biology. As the catalog grows across regional and international publishing imprints, managing records manually using spreadsheets or disconnected paper files creates severe data inconsistency, duplicate entries, and slow editorial tracking.
              </p>
              <p>
                In this publishing ecosystem, every book belongs to a specific scientific subject and is released by a publishing house. Authors are subject-matter specialists who may write one book independently or collaborate as co-authors with other researchers on multiple titles. Similarly, editors supervise the quality of publications—an editor can supervise several books at different editorial stages (such as Technical Review, Copy Editing, or Final Proofing), and a comprehensive book can be reviewed by multiple editors before going to print.
              </p>
              <p>
                The problem is to design and implement a normalized, reliable relational database management system using <strong>Oracle SQL</strong> that accurately stores information about publishers, scientific subjects, authors, editors, and books, enforces strict referential integrity, eliminates data redundancy, and enables fast reporting through structured SQL queries.
              </p>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 3. OBJECTIVES OF THE PROJECT                                   */}
          {/* ============================================================== */}
          <section id="sec-3" className="scroll-mt-24">
            <SectionHeader
              num="03"
              title="Objectives of the Project"
              subtitle="Core academic and technical goals achieved through this DBMS implementation."
            />
            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6">
              <ol className="space-y-3.5 text-[15px] leading-relaxed text-[#292524]">
                <li className="flex gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] pt-1 tabular-nums shrink-0">01.</span>
                  <span>
                    <strong>Centralized Catalog Management:</strong> Maintain accurate bibliographic records for all scientific books including ISBN, edition, publication date, price, page count, subject, and publisher.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] pt-1 tabular-nums shrink-0">02.</span>
                  <span>
                    <strong>Resolve Many-to-Many Relationships:</strong> Properly model multi-author collaborations and multi-editor book supervision using associative junction tables (<code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">BOOK_AUTHOR</code> and <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">BOOK_EDITOR</code>).
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] pt-1 tabular-nums shrink-0">03.</span>
                  <span>
                    <strong>Eliminate Redundancy via Normalization:</strong> Apply First, Second, and Third Normal Forms (1NF, 2NF, 3NF) to prevent insertion, update, and deletion anomalies.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] pt-1 tabular-nums shrink-0">04.</span>
                  <span>
                    <strong>Enforce Data Integrity in Oracle SQL:</strong> Use <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">PRIMARY KEY</code>, <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">FOREIGN KEY</code>, <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">UNIQUE</code>, <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">NOT NULL</code>, and <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">CHECK</code> constraints to block invalid entries.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="font-mono text-xs font-semibold text-[#1E3A8A] pt-1 tabular-nums shrink-0">05.</span>
                  <span>
                    <strong>Enable Analytical Querying:</strong> Write and verify 15 practical Oracle SQL queries using joins, aggregate functions, grouping, filtering, and sorting to support editorial and managerial decisions.
                  </span>
                </li>
              </ol>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 4. ANALYSIS OF DATA REQUIREMENTS                               */}
          {/* ============================================================== */}
          <section id="sec-4" className="scroll-mt-24">
            <SectionHeader
              num="04"
              title="Analysis of Data Requirements"
              subtitle="Breakdown of real-world information the publishing company must store and manage."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">1. Publisher Information</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  Each publishing division or imprint requires a unique publisher ID, registered name, headquarters city and country, official editorial email, and year of establishment.
                </p>
              </div>
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">2. Subject Classification</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  Scientific disciplines need a unique subject ID, subject name (must be unique), department classification code (such as CS-301), and a short topical description.
                </p>
              </div>
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">3. Author Profiles & Specialization</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  The company must store each author’s unique ID, first and last name, unique email address, highest academic qualification, university affiliation, and primary specialized subject.
                </p>
              </div>
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">4. Editor Directory</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  Editorial staff records require an editor ID, full name, unique corporate email, official designation (e.g., Senior Managing Editor), and years of publishing experience.
                </p>
              </div>
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">5. Book Catalog Metadata</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  Every scientific book requires a unique book ID, unique ISBN, title, edition number (at least 1), publication date, retail price (greater than 0), total page count, subject reference, and publisher reference.
                </p>
              </div>
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5">
                <h3 className="text-base font-semibold text-[#1C1917] mb-2">6. Authorship & Editorial Assignments</h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  For collaborative books, the system must record each author’s contribution role (Lead Author or Co-Author) and royalty percentage. For editing, it must track the editing stage and assignment date per editor-book pair.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 5. IDENTIFICATION OF ENTITIES AND ATTRIBUTES                   */}
          {/* ============================================================== */}
          <section id="sec-5" className="scroll-mt-24">
            <SectionHeader
              num="05"
              title="Identification of Entities and Attributes"
              subtitle="Seven core entities identified from the requirement analysis, with Primary Keys (PK) and Foreign Keys (FK)."
            />

            {/* Interactive filter tabs for viewing all or a single entity */}
            <div className="no-print flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F3EFE7] border border-[#E5DFD3] rounded-lg mb-6">
              <button
                type="button"
                onClick={() => setActiveEntityTab('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeEntityTab === 'all'
                    ? 'bg-white text-[#1E3A8A] shadow-xs font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                All Entities (7)
              </button>
              {ENTITIES_SPEC.map((ent) => (
                <button
                  key={ent.id}
                  type="button"
                  onClick={() => setActiveEntityTab(ent.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer font-mono ${
                    activeEntityTab === ent.id
                      ? 'bg-white text-[#1E3A8A] shadow-xs font-semibold'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {ent.tableName}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {visibleEntities.map((entity, idx) => (
                <div
                  key={entity.id}
                  className="bg-white border border-[#E5DFD3] rounded-lg overflow-hidden print-avoid-break"
                >
                  <div className="px-5 py-3.5 bg-[#F3EFE7] border-b border-[#E5DFD3] flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#57534E] tabular-nums">
                        5.{idx + 1}
                      </span>
                      <h3 className="text-base font-semibold text-[#1C1917]">
                        Entity: <span className="font-mono text-[#1E3A8A]">{entity.name}</span>
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-[#57534E]">
                      Table: {entity.tableName}
                    </span>
                  </div>
                  <p className="px-5 py-3 text-sm text-[#44403C] border-b border-[#EFECE4]">
                    {entity.role}
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#FAF8F3] border-b border-[#E5DFD3]">
                          <th className="px-4 py-2 text-xs font-semibold text-[#44403C]">Attribute Name</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#44403C]">Oracle Data Type</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#44403C]">Key</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#44403C]">Constraints</th>
                          <th className="px-4 py-2 text-xs font-semibold text-[#44403C]">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EFECE4]">
                        {entity.attributes.map((attr) => (
                          <tr key={attr.name}>
                            <td className="px-4 py-2 font-mono text-xs font-medium text-[#1C1917] whitespace-nowrap">
                              {attr.name}
                            </td>
                            <td className="px-4 py-2 font-mono text-xs text-[#57534E] whitespace-nowrap">
                              {attr.type}
                            </td>
                            <td
                              className={`px-4 py-2 font-mono text-xs font-semibold whitespace-nowrap ${
                                attr.keyType.includes('PK')
                                  ? 'text-[#1E3A8A]'
                                  : attr.keyType === 'FK'
                                  ? 'text-[#9A3412]'
                                  : 'text-[#78716C]'
                              }`}
                            >
                              {attr.keyType}
                            </td>
                            <td className="px-4 py-2 font-mono text-xs text-[#44403C] whitespace-nowrap">
                              {attr.constraints}
                            </td>
                            <td className="px-4 py-2 text-xs text-[#44403C]">
                              {attr.description}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 6. E-R DIAGRAM                                                 */}
          {/* ============================================================== */}
          <section id="sec-6" className="scroll-mt-24">
            <SectionHeader
              num="06"
              title="Entity-Relationship (E-R) Diagram"
              subtitle="Visual representation of all entities, attributes, primary/foreign keys, relationships, and cardinalities."
            />
            <ERDiagram />
          </section>

          {/* ============================================================== */}
          {/* 7. RELATIONSHIPS AND CARDINALITIES                             */}
          {/* ============================================================== */}
          <section id="sec-7" className="scroll-mt-24">
            <SectionHeader
              num="07"
              title="Relationships and Cardinalities"
              subtitle="Simple explanation of how each entity connects and why junction tables resolve many-to-many links."
            />
            <div className="space-y-4">
              <div className="bg-white border border-[#E5DFD3] rounded-lg overflow-hidden print-avoid-break">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#F3EFE7] border-b border-[#E5DFD3]">
                      <th className="px-4 py-2.5 text-xs font-semibold text-[#44403C]">Relationship</th>
                      <th className="px-4 py-2.5 text-xs font-semibold text-[#44403C] w-28">Cardinality</th>
                      <th className="px-4 py-2.5 text-xs font-semibold text-[#44403C]">Plain-Language Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE4]">
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1C1917] whitespace-nowrap">
                        PUBLISHER — publishes — BOOK
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#1E3A8A] whitespace-nowrap">
                        1 : M
                      </td>
                      <td className="px-4 py-3 text-sm text-[#44403C] leading-relaxed">
                        One publisher can release many books, whereas each book in the catalog is published by exactly one publisher (<code className="font-mono text-xs">publisher_id</code> FK in <code className="font-mono text-xs">BOOK</code>).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1C1917] whitespace-nowrap">
                        SUBJECT — categorizes — BOOK
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#1E3A8A] whitespace-nowrap">
                        1 : M
                      </td>
                      <td className="px-4 py-3 text-sm text-[#44403C] leading-relaxed">
                        One scientific subject covers many books, while each book is classified under one primary subject (<code className="font-mono text-xs">subject_id</code> FK in <code className="font-mono text-xs">BOOK</code>).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1C1917] whitespace-nowrap">
                        SUBJECT — specializes_in — AUTHOR
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#1E3A8A] whitespace-nowrap">
                        1 : M
                      </td>
                      <td className="px-4 py-3 text-sm text-[#44403C] leading-relaxed">
                        One subject can have many specialist authors, while each author declares one primary subject specialization (<code className="font-mono text-xs">subject_id</code> FK in <code className="font-mono text-xs">AUTHOR</code>).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1C1917] whitespace-nowrap">
                        BOOK — authored_by — AUTHOR
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#9A3412] whitespace-nowrap">
                        M : N
                      </td>
                      <td className="px-4 py-3 text-sm text-[#44403C] leading-relaxed">
                        One book can be written by multiple authors, and one author can write multiple books. Because relational tables cannot store M:N directly, this is resolved into two 1:M relationships via <code className="font-mono text-xs">BOOK_AUTHOR</code>.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-mono text-xs font-semibold text-[#1C1917] whitespace-nowrap">
                        BOOK — edited_by — EDITOR
                      </td>
                      <td className="px-4 py-3 font-mono text-xs font-bold text-[#9A3412] whitespace-nowrap">
                        M : N
                      </td>
                      <td className="px-4 py-3 text-sm text-[#44403C] leading-relaxed">
                        One book can pass through multiple editors (e.g., technical reviewer and copy editor), and one editor supervises many books. This M:N link is resolved via <code className="font-mono text-xs">BOOK_EDITOR</code>.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-[#F3EFE7] border border-[#D6CEBE] rounded-lg p-5 text-sm text-[#292524] leading-relaxed">
                <p className="font-semibold text-[#1C1917] mb-1">Note on 1:1 vs 1:M vs M:N in This Schema</p>
                <p>
                  In the conceptual model, <code className="font-mono text-xs">BOOK</code> has a unique 1:1 correspondence with its <code className="font-mono text-xs">ISBN</code> identifier (enforced via <code className="font-mono text-xs">UNIQUE</code> constraint on <code className="font-mono text-xs">isbn</code>). Every parent-child hierarchy uses <code className="font-mono text-xs">1:M</code>, and every multi-participant collaboration uses <code className="font-mono text-xs">M:N</code> decomposed into associative entities.
                </p>
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 8. NORMALIZATION (UNF -> 1NF -> 2NF -> 3NF)                    */}
          {/* ============================================================== */}
          <section id="sec-8" className="scroll-mt-24">
            <SectionHeader
              num="08"
              title="Normalization (1NF, 2NF, and 3NF)"
              subtitle="Step-by-step transformation from an unnormalized flat table into Third Normal Form to eliminate redundancy and anomalies."
            />

            <div className="space-y-8">
              {/* Why Normalize */}
              <div className="bg-white border border-[#E5DFD3] rounded-lg p-5 text-sm text-[#292524] leading-relaxed space-y-2">
                <h3 className="text-base font-semibold text-[#1C1917]">Why Normalization Is Required</h3>
                <p>
                  If the publishing company stored all information in a single flat spreadsheet (<code className="font-mono text-xs">BOOK_MASTER_UNF</code>), three major data anomalies would occur:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[#44403C]">
                  <li><strong>Insertion Anomaly:</strong> You cannot add a new Author or Publisher until they have at least one published Book.</li>
                  <li><strong>Update Anomaly:</strong> Changing a publisher’s city or an author’s affiliation requires updating multiple rows; missing one row creates conflicting data.</li>
                  <li><strong>Deletion Anomaly:</strong> Deleting the last book of a subject accidentally erases the subject and publisher details as well.</li>
                </ul>
              </div>

              {/* Step 0: UNF */}
              <div className="space-y-3 print-avoid-break">
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Step 0 · Before Normalization: Unnormalized Form (UNF)
                </h3>
                <p className="text-sm text-[#44403C]">
                  Notice repeating multi-valued groups inside <code className="font-mono text-xs">author_names</code> and <code className="font-mono text-xs">editor_names</code> in a single row.
                </p>
                <DataTable
                  columns={['book_id', 'title', 'author_names (Repeating)', 'editor_names (Repeating)', 'publisher_name', 'pub_city', 'subject_name']}
                  rows={[
                    [501, 'Fundamentals of Relational Databases', 'Dr. Rajesh Sharma, Dr. Arvind Subramanian', 'Meera Iyer, Siddharth Verma', 'Apex Scientific Press', 'New Delhi', 'Database Systems'],
                    [502, 'Foundations of Statistical AI', 'Prof. Anita Desai, Prof. Hannah Lindqvist', 'Jonathan Blake', 'Meridian Academic House', 'Boston', 'Artificial Intelligence'],
                  ]}
                  caption="Table 8.1 · Unnormalized Table (violates atomicity due to comma-separated repeating values)"
                />
              </div>

              {/* Step 1: 1NF */}
              <div className="space-y-3 print-avoid-break">
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Step 1 · First Normal Form (1NF): Atomic Values & Composite Key
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  <strong>Rule:</strong> Every column must contain atomic (single, indivisible) values and each row must be uniquely identifiable. We split repeating author/editor pairs into separate rows with composite key <code className="font-mono text-xs">(book_id, author_id, editor_id)</code>.
                </p>
                <DataTable
                  columns={['book_id', 'author_id', 'editor_id', 'title', 'author_name', 'publisher_name', 'pub_city', 'subject_name']}
                  rows={[
                    [501, 301, 401, 'Fundamentals of Relational Databases', 'Dr. Rajesh Sharma', 'Apex Scientific Press', 'New Delhi', 'Database Systems'],
                    [501, 301, 403, 'Fundamentals of Relational Databases', 'Dr. Rajesh Sharma', 'Apex Scientific Press', 'New Delhi', 'Database Systems'],
                    [501, 309, 401, 'Fundamentals of Relational Databases', 'Dr. Arvind Subramanian', 'Apex Scientific Press', 'New Delhi', 'Database Systems'],
                    [501, 309, 403, 'Fundamentals of Relational Databases', 'Dr. Arvind Subramanian', 'Apex Scientific Press', 'New Delhi', 'Database Systems'],
                  ]}
                  caption="Table 8.2 · 1NF Table (atomic values achieved, but severe redundancy and partial dependencies remain)"
                />
              </div>

              {/* Step 2: 2NF */}
              <div className="space-y-3 print-avoid-break">
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Step 2 · Second Normal Form (2NF): Remove Partial Dependencies
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  <strong>Rule:</strong> Must be in 1NF, and every non-key attribute must depend on the <em>entire</em> primary key, not just part of it. In Table 8.2, <code className="font-mono text-xs">title</code> depends only on <code className="font-mono text-xs">book_id</code>, <code className="font-mono text-xs">author_name</code> depends only on <code className="font-mono text-xs">author_id</code>, and <code className="font-mono text-xs">editor_name</code> depends only on <code className="font-mono text-xs">editor_id</code>. We decompose into separate tables:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E5DFD3] rounded-lg p-4 text-xs font-mono space-y-1.5">
                    <p className="font-semibold text-[#1E3A8A]">BOOK_2NF (PK: book_id)</p>
                    <p className="text-[#44403C]">(<u>book_id</u>, isbn, title, edition, publication_date, price, pages, subject_id, publisher_id, publisher_name, pub_city, subject_name)</p>
                  </div>
                  <div className="bg-white border border-[#E5DFD3] rounded-lg p-4 text-xs font-mono space-y-1.5">
                    <p className="font-semibold text-[#1E3A8A]">AUTHOR_2NF & EDITOR_2NF</p>
                    <p className="text-[#44403C]">AUTHOR (<u>author_id</u>, first_name, last_name, email, qualification, affiliation, subject_id)</p>
                    <p className="text-[#44403C]">EDITOR (<u>editor_id</u>, first_name, last_name, email, designation, experience_years)</p>
                  </div>
                  <div className="bg-white border border-[#E5DFD3] rounded-lg p-4 text-xs font-mono space-y-1.5">
                    <p className="font-semibold text-[#1E3A8A]">BOOK_AUTHOR (PK: book_id, author_id)</p>
                    <p className="text-[#44403C]">(<u>book_id</u>, <u>author_id</u>, author_role, royalty_share)</p>
                  </div>
                  <div className="bg-white border border-[#E5DFD3] rounded-lg p-4 text-xs font-mono space-y-1.5">
                    <p className="font-semibold text-[#1E3A8A]">BOOK_EDITOR (PK: book_id, editor_id)</p>
                    <p className="text-[#44403C]">(<u>book_id</u>, <u>editor_id</u>, editing_stage, assigned_date)</p>
                  </div>
                </div>
              </div>

              {/* Step 3: 3NF */}
              <div className="space-y-3 print-avoid-break">
                <h3 className="text-base font-semibold text-[#1C1917]">
                  Step 3 · Third Normal Form (3NF): Remove Transitive Dependencies
                </h3>
                <p className="text-sm text-[#44403C] leading-relaxed">
                  <strong>Rule:</strong> Must be in 2NF, and no non-key attribute may depend on another non-key attribute. In <code className="font-mono text-xs">BOOK_2NF</code>, we have transitive dependencies:
                  <br />
                  <code className="font-mono text-xs text-[#9A3412]">book_id → publisher_id → (publisher_name, pub_city, country)</code>
                  <br />
                  <code className="font-mono text-xs text-[#9A3412]">book_id → subject_id → (subject_name, department_code)</code>
                  <br />
                  Moving publisher and subject attributes into their own <code className="font-mono text-xs">PUBLISHER</code> and <code className="font-mono text-xs">SUBJECT</code> tables yields our final 3NF schema with zero transitive dependencies:
                </p>
                <DataTable
                  columns={['Final 3NF Table', 'Primary Key', 'Foreign Keys', 'Anomaly Prevented']}
                  rows={[
                    ['PUBLISHER', 'publisher_id', 'None', 'Publisher city/email stored once; easy updates'],
                    ['SUBJECT', 'subject_id', 'None', 'Subjects exist independently of books'],
                    ['AUTHOR', 'author_id', 'subject_id -> SUBJECT', 'Author details stored once regardless of book count'],
                    ['EDITOR', 'editor_id', 'None', 'Editor profile stored once across all supervised books'],
                    ['BOOK', 'book_id', 'subject_id, publisher_id', 'Only direct book attributes + FK references'],
                    ['BOOK_AUTHOR', '(book_id, author_id)', 'book_id, author_id', 'Supports any number of co-authors cleanly'],
                    ['BOOK_EDITOR', '(book_id, editor_id)', 'book_id, editor_id', 'Supports multiple editorial stages per book'],
                  ]}
                  caption="Table 8.3 · Final 3NF Decomposition Summary"
                />
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 9. LOGICAL DATABASE DESIGN / RELATIONAL SCHEMA                 */}
          {/* ============================================================== */}
          <section id="sec-9" className="scroll-mt-24">
            <SectionHeader
              num="09"
              title="Logical Database Design / Relational Schema"
              subtitle="Complete relational schema notation showing table names, attributes, primary keys, foreign keys, and relationships."
            />

            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 space-y-4 font-mono text-xs md:text-[13px] leading-relaxed mb-6 print-avoid-break">
              <div>
                <span className="font-bold text-[#1E3A8A]">PUBLISHER</span> (<u>publisher_id</u>, publisher_name, city, country, contact_email, established_year)
              </div>
              <div>
                <span className="font-bold text-[#1E3A8A]">SUBJECT</span> (<u>subject_id</u>, subject_name, department_code, description)
              </div>
              <div>
                <span className="font-bold text-[#1E3A8A]">AUTHOR</span> (<u>author_id</u>, first_name, last_name, email, qualification, affiliation, <span className="text-[#9A3412]">subject_id*</span>)
              </div>
              <div>
                <span className="font-bold text-[#1E3A8A]">EDITOR</span> (<u>editor_id</u>, first_name, last_name, email, designation, experience_years)
              </div>
              <div>
                <span className="font-bold text-[#1E3A8A]">BOOK</span> (<u>book_id</u>, isbn, title, edition, publication_date, price, pages, <span className="text-[#9A3412]">subject_id*</span>, <span className="text-[#9A3412]">publisher_id*</span>)
              </div>
              <div>
                <span className="font-bold text-[#1E3A8A]">BOOK_AUTHOR</span> (<u><span className="text-[#9A3412]">book_id*</span></u>, <u><span className="text-[#9A3412]">author_id*</span></u>, author_role, royalty_share)
              </div>
              <div>
                <span className="font-bold text-[#1E3A8A]">BOOK_EDITOR</span> (<u><span className="text-[#9A3412]">book_id*</span></u>, <u><span className="text-[#9A3412]">editor_id*</span></u>, editing_stage, assigned_date)
              </div>
              <p className="text-[11px] font-sans text-[#57534E] pt-2 border-t border-[#EFECE4]">
                Notation: <u>Underlined</u> attributes denote Primary Keys (PK); attributes marked with <span className="font-mono text-[#9A3412]">*</span> denote Foreign Keys (FK).
              </p>
            </div>

            <DataTable
              columns={['Table Name', 'Primary Key (PK)', 'Foreign Key(s) (FK)', 'Referenced Parent Table(s)', 'Relationship Type']}
              rows={[
                ['PUBLISHER', 'publisher_id', '—', '—', 'Parent of BOOK (1:M)'],
                ['SUBJECT', 'subject_id', '—', '—', 'Parent of BOOK & AUTHOR (1:M)'],
                ['AUTHOR', 'author_id', 'subject_id', 'SUBJECT(subject_id)', 'Child of SUBJECT (M:1); Parent of BOOK_AUTHOR'],
                ['EDITOR', 'editor_id', '—', '—', 'Parent of BOOK_EDITOR (1:M)'],
                ['BOOK', 'book_id', 'subject_id, publisher_id', 'SUBJECT, PUBLISHER', 'Child of SUBJECT & PUBLISHER'],
                ['BOOK_AUTHOR', '(book_id, author_id)', 'book_id, author_id', 'BOOK, AUTHOR', 'Resolves BOOK M:N AUTHOR'],
                ['BOOK_EDITOR', '(book_id, editor_id)', 'book_id, editor_id', 'BOOK, EDITOR', 'Resolves BOOK M:N EDITOR'],
              ]}
              caption="Table 9.1 · Complete Relational Schema Mapping & Referential Links"
            />
          </section>

          {/* ============================================================== */}
          {/* 10. SQL TABLE CREATION COMMANDS                                */}
          {/* ============================================================== */}
          <section id="sec-10" className="scroll-mt-24">
            <SectionHeader
              num="10"
              title="SQL Table Creation Commands (Oracle SQL)"
              subtitle="Executable Oracle DDL statements created in strict parent-before-child dependency order."
            />
            <p className="text-sm text-[#44403C] leading-relaxed mb-4">
              Tables are created in exact dependency order: <code className="font-mono text-xs">PUBLISHER</code>, <code className="font-mono text-xs">SUBJECT</code>, <code className="font-mono text-xs">AUTHOR</code>, <code className="font-mono text-xs">EDITOR</code>, <code className="font-mono text-xs">BOOK</code>, <code className="font-mono text-xs">BOOK_AUTHOR</code>, and <code className="font-mono text-xs">BOOK_EDITOR</code>. All constraints are explicitly named following Oracle conventions.
            </p>
            <SqlCodeBlock code={ORACLE_DDL_SQL} label="Oracle SQL DDL · CREATE TABLE Script" />
          </section>

          {/* ============================================================== */}
          {/* 11. SQL INSERT STATEMENTS WITH SAMPLE DATA                     */}
          {/* ============================================================== */}
          <section id="sec-11" className="scroll-mt-24">
            <SectionHeader
              num="11"
              title="SQL Insert Statements with Sample Data"
              subtitle="Realistic, referentially valid sample dataset: 3 Publishers, 8 Subjects, 10 Authors, 5 Editors, 10 Books, 15 Book-Author links, and 13 Book-Editor links."
            />

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
              {[
                { name: 'PUBLISHER', count: PUBLISHERS.length },
                { name: 'SUBJECT', count: SUBJECTS.length },
                { name: 'AUTHOR', count: AUTHORS.length },
                { name: 'EDITOR', count: EDITORS.length },
                { name: 'BOOK', count: BOOKS.length },
                { name: 'BOOK_AUTHOR', count: BOOK_AUTHORS.length },
                { name: 'BOOK_EDITOR', count: BOOK_EDITORS.length },
              ].map((stat) => (
                <div key={stat.name} className="bg-white border border-[#E5DFD3] rounded-md p-3 text-center">
                  <p className="text-xl font-mono font-semibold text-[#1E3A8A] tabular-nums">
                    {stat.count}
                  </p>
                  <p className="text-[11px] font-mono text-[#57534E] mt-0.5 truncate">
                    {stat.name}
                  </p>
                </div>
              ))}
            </div>

            <SqlCodeBlock code={ORACLE_DML_SQL} label="Oracle SQL DML · INSERT INTO Script (64 Total Rows)" maxHeight="520px" />

            <div className="mt-6 space-y-6">
              <DataTable
                columns={['PUBLISHER_ID', 'PUBLISHER_NAME', 'CITY', 'COUNTRY', 'ESTABLISHED_YEAR']}
                rows={PUBLISHERS.map((p) => [p.publisher_id, p.publisher_name, p.city, p.country, p.established_year])}
                caption="Inserted Data Preview · PUBLISHER (3 Rows)"
              />
              <DataTable
                columns={['SUBJECT_ID', 'SUBJECT_NAME', 'DEPARTMENT_CODE', 'DESCRIPTION']}
                rows={SUBJECTS.map((s) => [s.subject_id, s.subject_name, s.department_code, s.description])}
                caption="Inserted Data Preview · SUBJECT (8 Rows)"
              />
              <DataTable
                columns={['EDITOR_ID', 'EDITOR_NAME', 'DESIGNATION', 'EXPERIENCE_YEARS', 'EMAIL']}
                rows={EDITORS.map((e) => [e.editor_id, `${e.first_name} ${e.last_name}`, e.designation, e.experience_years, e.email])}
                caption="Inserted Data Preview · EDITOR (5 Rows)"
              />
            </div>
          </section>

          {/* ============================================================== */}
          {/* 12. 15 SQL QUERIES WITH EXACT OUTPUTS                          */}
          {/* ============================================================== */}
          <section id="sec-12" className="scroll-mt-24">
            <SectionHeader
              num="12"
              title="15 Oracle SQL Queries with Verified Outputs"
              subtitle="All 15 required Oracle SQL queries covering basic retrieval, joins, aggregates, GROUP BY/HAVING, multi-author books, multi-book editors, and sorting."
            />

            <div className="space-y-10">
              {SQL_QUERIES.map((q) => (
                <article
                  key={q.id}
                  className="bg-white border border-[#D6CEBE] rounded-lg overflow-hidden print-avoid-break"
                >
                  <div className="px-5 py-3.5 bg-[#F3EFE7] border-b border-[#D6CEBE] flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-[#1C1917]">
                      <span className="font-mono text-[#1E3A8A] mr-2 tabular-nums">
                        Query {String(q.id).padStart(2, '0')}:
                      </span>
                      {q.title}
                    </h3>
                    <span className="text-xs font-mono text-[#57534E]">
                      {q.conceptTag}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    <p className="text-sm text-[#44403C]">
                      <strong className="text-[#1C1917]">Purpose:</strong> {q.purpose}
                    </p>

                    <SqlCodeBlock code={q.sql} label={`Oracle SQL · Query ${q.id}`} />

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E] mb-2">
                        Expected Query Output ({q.rows.length} {q.rows.length === 1 ? 'Row' : 'Rows'})
                      </p>
                      <DataTable columns={q.columns} rows={q.rows} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* 13. TESTING AND SCREENSHOTS                                    */}
          {/* ============================================================== */}
          <section id="sec-13" className="scroll-mt-24">
            <SectionHeader
              num="13"
              title="Testing and Screenshots"
              subtitle="Step-by-step execution guide for Oracle SQL Developer / Oracle Live SQL and designated screenshot placeholders."
            />

            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 mb-6 space-y-4">
              <div className="flex items-center gap-2 text-[#1E3A8A]">
                <FileCode2 className="w-4 h-4" />
                <h3 className="text-base font-semibold text-[#1C1917]">
                  How to Execute in Oracle SQL Developer or Oracle Live SQL
                </h3>
              </div>
              <ol className="space-y-2.5 text-sm text-[#292524] leading-relaxed list-decimal pl-5">
                <li>
                  <strong>Option A — Oracle Live SQL (Browser):</strong> Visit <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">livesql.oracle.com</code>, sign in with an Oracle account, and open the <strong>SQL Worksheet</strong>.
                </li>
                <li>
                  <strong>Option B — Oracle SQL Developer (Desktop):</strong> Connect to your local Oracle XE / PDB schema (e.g., <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">SYSTEM</code> or <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">SCOTT</code>) and open a new SQL Worksheet.
                </li>
                <li>
                  <strong>Run DDL Commands:</strong> Paste Section 10 (<code className="font-mono text-xs">CREATE TABLE</code> statements) and click <strong>Run Script (F5)</strong>. Verify that all 7 tables show <code className="font-mono text-xs">Table PUBLISHER created</code> through <code className="font-mono text-xs">Table BOOK_EDITOR created</code>.
                </li>
                <li>
                  <strong>Inspect Table Structures:</strong> Execute <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">DESC BOOK;</code> and <code className="font-mono text-xs bg-[#F3EFE7] px-1.5 py-0.5 rounded">DESC BOOK_AUTHOR;</code> to verify column data types and <code className="font-mono text-xs">NOT NULL</code> flags.
                </li>
                <li>
                  <strong>Insert Sample Data & Commit:</strong> Paste Section 11 (<code className="font-mono text-xs">INSERT INTO</code> statements + <code className="font-mono text-xs">COMMIT;</code>) and run via F5. Confirm <code className="font-mono text-xs">1 row inserted</code> for all 64 statements.
                </li>
                <li>
                  <strong>Execute Verification Queries:</strong> Run Queries 1–15 one by one (Ctrl+Enter) and compare your Query Result grid against Section 12.
                </li>
              </ol>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
                Required Lab Report Screenshot Placeholders (Insert Actual Captured Screenshots Before Submission)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    fig: 'Screenshot 13.1',
                    title: 'Table Creation Output',
                    desc: 'Capture the Script Output pane showing "Table created." for PUBLISHER, SUBJECT, AUTHOR, EDITOR, BOOK, BOOK_AUTHOR, and BOOK_EDITOR.',
                    cmd: 'CREATE TABLE ... (Run via F5)',
                  },
                  {
                    fig: 'Screenshot 13.2',
                    title: 'Table Structures Verification',
                    desc: 'Capture the DESCRIBE output confirming column names, NUMBER/VARCHAR2/DATE datatypes, and NOT NULL constraints.',
                    cmd: 'DESC PUBLISHER; DESC BOOK; DESC BOOK_AUTHOR;',
                  },
                  {
                    fig: 'Screenshot 13.3',
                    title: 'Inserted Sample Records',
                    desc: 'Capture the Script Output confirming 64 rows inserted and committed, plus SELECT * FROM BOOK; and SELECT * FROM AUTHOR;.',
                    cmd: 'INSERT INTO ...; COMMIT; SELECT * FROM BOOK;',
                  },
                  {
                    fig: 'Screenshot 13.4',
                    title: 'Execution of SQL Queries',
                    desc: 'Capture the SQL Worksheet showing multi-table JOIN and GROUP BY / HAVING queries (e.g., Queries 8, 11, 12, and 14).',
                    cmd: 'SELECT b.book_id, b.title, COUNT(ba.author_id) ...',
                  },
                  {
                    fig: 'Screenshot 13.5',
                    title: 'Formatted Query Outputs',
                    desc: 'Capture the Query Result grid in Oracle SQL Developer / Live SQL displaying exact matching output rows.',
                    cmd: 'Query Result Grid (Queries 1–15)',
                  },
                ].map((slot) => (
                  <div
                    key={slot.fig}
                    className="border border-dashed border-[#A8A29E] rounded-lg p-5 bg-[#FAF8F3] flex flex-col justify-between min-h-[175px] print-avoid-break"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono font-semibold text-[#1E3A8A]">
                          {slot.fig} · Placeholder
                        </span>
                        <Camera className="w-4 h-4 text-[#78716C]" />
                      </div>
                      <h4 className="text-sm font-semibold text-[#1C1917] mb-1">
                        {slot.title}
                      </h4>
                      <p className="text-xs text-[#57534E] leading-relaxed">
                        {slot.desc}
                      </p>
                    </div>
                    <p className="mt-4 pt-2 border-t border-[#E5DFD3] font-mono text-[11px] text-[#44403C]">
                      Command: {slot.cmd}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 14. CONCLUSION                                                 */}
          {/* ============================================================== */}
          <section id="sec-14" className="scroll-mt-24">
            <SectionHeader
              num="14"
              title="Conclusion"
              subtitle="Summary of design outcomes and technical skills demonstrated in Experiment 10."
            />
            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6 text-[15px] leading-[1.75] text-[#292524] space-y-3">
              <p>
                Through this DBMS case study project on the <strong>Book Publishing Company</strong>, we successfully translated a real-world publishing workflow into a fully normalized, production-structured Oracle SQL relational database. Starting from requirement analysis and entity identification, we modeled seven cohesive tables—<code className="font-mono text-xs">PUBLISHER</code>, <code className="font-mono text-xs">SUBJECT</code>, <code className="font-mono text-xs">AUTHOR</code>, <code className="font-mono text-xs">EDITOR</code>, <code className="font-mono text-xs">BOOK</code>, <code className="font-mono text-xs">BOOK_AUTHOR</code>, and <code className="font-mono text-xs">BOOK_EDITOR</code>—and resolved many-to-many relationships cleanly.
              </p>
              <p>
                Applying First, Second, and Third Normal Forms (1NF–3NF) eliminated repeating groups, partial dependencies, and transitive dependencies, preventing insertion, update, and deletion anomalies. Finally, implementing the schema in Oracle SQL with strict <code className="font-mono text-xs">PRIMARY KEY</code>, <code className="font-mono text-xs">FOREIGN KEY</code>, <code className="font-mono text-xs">UNIQUE</code>, <code className="font-mono text-xs">NOT NULL</code>, and <code className="font-mono text-xs">CHECK</code> constraints, populating 64 verified sample records, and executing 15 analytical queries demonstrated complete end-to-end mastery of relational database design and querying.
              </p>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 15. REFERENCES                                                 */}
          {/* ============================================================== */}
          <section id="sec-15" className="scroll-mt-24">
            <SectionHeader
              num="15"
              title="References"
              subtitle="Standard DBMS textbooks, Oracle documentation, and academic learning resources."
            />
            <div className="bg-white border border-[#E5DFD3] rounded-lg p-6">
              <ol className="space-y-3 text-sm text-[#292524] leading-relaxed list-decimal pl-5">
                <li>
                  Silberschatz, A., Korth, H. F., &amp; Sudarshan, S. (2020). <em>Database System Concepts</em> (7th Edition). McGraw-Hill Education.
                </li>
                <li>
                  Elmasri, R., &amp; Navathe, S. B. (2016). <em>Fundamentals of Database Systems</em> (7th Edition). Pearson Education.
                </li>
                <li>
                  Date, C. J. (2004). <em>An Introduction to Database Systems</em> (8th Edition). Addison-Wesley.
                </li>
                <li>
                  Oracle Corporation. <em>Oracle Database SQL Language Reference (19c / 21c / 23ai)</em>. Official Documentation: <span className="font-mono text-xs text-[#1E3A8A]">docs.oracle.com/en/database/oracle/oracle-database</span>
                </li>
                <li>
                  Oracle Live SQL Interactive Learning &amp; Testing Environment. <span className="font-mono text-xs text-[#1E3A8A]">livesql.oracle.com</span>
                </li>
                <li>
                  Oracle SQL Developer User’s Guide. Oracle Corporation Official Documentation.
                </li>
              </ol>
            </div>
          </section>

          {/* ============================================================== */}
          {/* 16. 20 VIVA QUESTIONS WITH SHORT ANSWERS                       */}
          {/* ============================================================== */}
          <section id="sec-16" className="scroll-mt-24 pb-16">
            <SectionHeader
              num="16"
              title="20 Important Viva Questions & Answers"
              subtitle="Concise, high-yield viva preparation covering ER modeling, normalization, keys, constraints, and Oracle SQL."
            />

            {/* Topic filter buttons */}
            <div className="no-print flex flex-wrap items-center gap-1.5 p-1.5 bg-[#F3EFE7] border border-[#E5DFD3] rounded-lg mb-6">
              {vivaTopics.map((topic) => (
                <button
                  key={topic}
                  type="button"
                  onClick={() => setVivaFilter(topic)}
                  className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    vivaFilter === topic
                      ? 'bg-white text-[#1E3A8A] shadow-xs font-semibold'
                      : 'text-[#57534E] hover:text-[#1C1917]'
                  }`}
                >
                  {topic}
                </button>
              ))}
            </div>

            <div className="space-y-3.5">
              {filteredViva.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E5DFD3] rounded-lg p-5 print-avoid-break"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                    <h3 className="text-sm md:text-[15px] font-semibold text-[#1C1917]">
                      <span className="font-mono text-[#1E3A8A] mr-2 tabular-nums">
                        Q{String(item.id).padStart(2, '0')}.
                      </span>
                      {item.question}
                    </h3>
                    <span className="text-xs font-mono text-[#78716C] shrink-0">
                      {item.topic}
                    </span>
                  </div>
                  <p className="text-sm text-[#44403C] leading-relaxed pl-0 md:pl-8">
                    <strong className="text-[#1C1917]">Ans:</strong> {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

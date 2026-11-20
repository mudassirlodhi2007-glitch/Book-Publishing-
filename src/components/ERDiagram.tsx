import { useState } from 'react';

type NotationMode = 'crowsfoot' | 'chen';

interface EntityBoxProps {
  x: number;
  y: number;
  w: number;
  title: string;
  subtitle?: string;
  fields: { name: string; key?: 'PK' | 'FK' | 'PK,FK'; type: string }[];
}

function EntityBox({ x, y, w, title, subtitle, fields }: EntityBoxProps) {
  const headerH = subtitle ? 40 : 30;
  const rowH = 22;
  const totalH = headerH + fields.length * rowH + 8;

  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        width={w}
        height={totalH}
        rx={5}
        fill="#FFFFFF"
        stroke="#1C1917"
        strokeWidth={1.4}
      />
      <rect
        width={w}
        height={headerH}
        rx={5}
        fill="#1E3A8A"
      />
      {/* Square off bottom corners of header */}
      <rect
        y={headerH - 5}
        width={w}
        height={5}
        fill="#1E3A8A"
      />
      <text
        x={w / 2}
        y={subtitle ? 17 : 20}
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="12"
        fontWeight="700"
        fontFamily="JetBrains Mono, monospace"
      >
        {title}
      </text>
      {subtitle && (
        <text
          x={w / 2}
          y={32}
          textAnchor="middle"
          fill="#DBEAFE"
          fontSize="9.5"
          fontFamily="Plus Jakarta Sans, sans-serif"
        >
          {subtitle}
        </text>
      )}
      {fields.map((f, idx) => {
        const fy = headerH + 17 + idx * rowH;
        const isPK = f.key === 'PK' || f.key === 'PK,FK';
        const isFK = f.key === 'FK' || f.key === 'PK,FK';
        return (
          <g key={f.name}>
            {idx > 0 && (
              <line
                x1={8}
                y1={headerH + 3 + idx * rowH}
                x2={w - 8}
                y2={headerH + 3 + idx * rowH}
                stroke="#EFECE4"
                strokeWidth={1}
              />
            )}
            {f.key && (
              <text
                x={10}
                y={fy}
                fontSize="9.5"
                fontWeight="700"
                fontFamily="JetBrains Mono, monospace"
                fill={isPK ? '#1E3A8A' : '#9A3412'}
              >
                {f.key}
              </text>
            )}
            <text
              x={f.key ? 52 : 12}
              y={fy}
              fontSize="10.5"
              fontWeight={isPK ? '700' : '500'}
              textDecoration={isPK ? 'underline' : undefined}
              fontFamily="JetBrains Mono, monospace"
              fill={isFK && !isPK ? '#7C2D12' : '#1C1917'}
            >
              {f.name}
            </text>
            <text
              x={w - 10}
              y={fy}
              textAnchor="end"
              fontSize="9.5"
              fontFamily="JetBrains Mono, monospace"
              fill="#78716C"
            >
              {f.type}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Diamond({
  cx,
  cy,
  rx,
  ry,
  label,
  sublabel,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  label: string;
  sublabel?: string;
}) {
  const points = `${cx},${cy - ry} ${cx + rx},${cy} ${cx},${cy + ry} ${cx - rx},${cy}`;
  return (
    <g>
      <polygon
        points={points}
        fill="#F3EFE7"
        stroke="#1E3A8A"
        strokeWidth={1.6}
      />
      <text
        x={cx}
        y={sublabel ? cy - 2 : cy + 4}
        textAnchor="middle"
        fontSize="11"
        fontWeight="700"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fill="#1E3A8A"
      >
        {label}
      </text>
      {sublabel && (
        <text
          x={cx}
          y={cy + 12}
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
          fontFamily="JetBrains Mono, monospace"
          fill="#57534E"
        >
          {sublabel}
        </text>
      )}
    </g>
  );
}

export function ERDiagram() {
  const [mode, setMode] = useState<NotationMode>('crowsfoot');

  return (
    <div className="border border-[#D6CEBE] rounded-lg bg-white overflow-hidden print-avoid-break">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 bg-[#F3EFE7] border-b border-[#D6CEBE]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#44403C]">
            Fig. 1 · Book Publishing Company Entity-Relationship Diagram
          </p>
          <p className="text-xs text-[#57534E] mt-0.5">
            {mode === 'crowsfoot'
              ? 'Logical Schema & Crow’s Foot Notation — showing all 7 tables, PK/FK keys, and resolved M:N junction entities'
              : 'Conceptual Chen Notation — showing core entities, diamond relationships, and 1:M / M:N cardinalities'}
          </p>
        </div>
        <div className="no-print flex items-center gap-1 p-1 bg-white border border-[#D6CEBE] rounded-md">
          <button
            type="button"
            onClick={() => setMode('crowsfoot')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'crowsfoot'
                ? 'bg-[#1E3A8A] text-white'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Logical Schema (7 Entities)
          </button>
          <button
            type="button"
            onClick={() => setMode('chen')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              mode === 'chen'
                ? 'bg-[#1E3A8A] text-white'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            Conceptual Chen (Diamonds)
          </button>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="p-4 md:p-6 bg-[#FDFCFA] overflow-x-auto">
        {mode === 'crowsfoot' ? (
          <svg
            viewBox="0 0 1120 770"
            className="w-full min-w-[820px] h-auto block mx-auto"
            role="img"
            aria-label="Entity Relationship Diagram in Logical Crow's Foot Notation for Book Publishing Company"
          >
            {/* Subtle background grid dots */}
            <defs>
              <pattern id="er-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#E5DFD3" />
              </pattern>
            </defs>
            <rect width="1120" height="770" fill="url(#er-grid)" />

            {/* ================= RELATIONSHIP LINES ================= */}
            {/* 1. PUBLISHER (1) -> BOOK (M) */}
            <path
              d="M 275 130 L 405 130"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            {/* 1 side tick at PUBLISHER */}
            <line x1="286" y1="122" x2="286" y2="138" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="291" y1="122" x2="291" y2="138" stroke="#1E3A8A" strokeWidth={2} />
            {/* Crow's foot at BOOK */}
            <line x1="391" y1="130" x2="405" y2="122" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="391" y1="130" x2="405" y2="138" stroke="#1E3A8A" strokeWidth={1.8} />
            <circle cx="387" cy="130" r="3.5" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth={1.6} />
            <rect x="306" y="109" width="68" height="17" rx={3} fill="#F3EFE7" />
            <text x="340" y="121" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              publishes (1:M)
            </text>

            {/* 2. SUBJECT (1) -> BOOK (M) */}
            <path
              d="M 835 130 L 695 130"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            {/* 1 side tick at SUBJECT */}
            <line x1="824" y1="122" x2="824" y2="138" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="819" y1="122" x2="819" y2="138" stroke="#1E3A8A" strokeWidth={2} />
            {/* Crow's foot at BOOK */}
            <line x1="709" y1="130" x2="695" y2="122" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="709" y1="130" x2="695" y2="138" stroke="#1E3A8A" strokeWidth={1.8} />
            <circle cx="713" cy="130" r="3.5" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth={1.6} />
            <rect x="726" y="109" width="80" height="17" rx={3} fill="#F3EFE7" />
            <text x="766" y="121" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              categorizes (1:M)
            </text>

            {/* 3. SUBJECT (1) -> AUTHOR (M) */}
            <path
              d="M 970 176 L 970 500"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            <line x1="962" y1="188" x2="978" y2="188" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="962" y1="193" x2="978" y2="193" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="970" y1="486" x2="962" y2="500" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="970" y1="486" x2="978" y2="500" stroke="#1E3A8A" strokeWidth={1.8} />
            <circle cx="970" cy="482" r="3.5" fill="#FFFFFF" stroke="#1E3A8A" strokeWidth={1.6} />
            <rect x="914" y="330" width="112" height="18" rx={3} fill="#F3EFE7" />
            <text x="970" y="343" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              specializes_in (1:M)
            </text>

            {/* 4. BOOK (1) -> BOOK_AUTHOR (M) */}
            <path
              d="M 620 266 L 620 340 L 725 340 L 725 365"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            <line x1="612" y1="278" x2="628" y2="278" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="725" y1="351" x2="717" y2="365" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="725" y1="351" x2="733" y2="365" stroke="#1E3A8A" strokeWidth={1.8} />
            <rect x="635" y="317" width="60" height="17" rx={3} fill="#F3EFE7" />
            <text x="665" y="329" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              has (1:M)
            </text>

            {/* 5. AUTHOR (1) -> BOOK_AUTHOR (M) */}
            <path
              d="M 835 585 L 725 585 L 725 491"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            <line x1="824" y1="577" x2="824" y2="593" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="725" y1="505" x2="717" y2="491" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="725" y1="505" x2="733" y2="491" stroke="#1E3A8A" strokeWidth={1.8} />
            <rect x="738" y="564" width="76" height="17" rx={3} fill="#F3EFE7" />
            <text x="776" y="576" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              writes (1:M)
            </text>

            {/* 6. BOOK (1) -> BOOK_EDITOR (M) */}
            <path
              d="M 480 266 L 480 340 L 385 340 L 385 365"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            <line x1="472" y1="278" x2="488" y2="278" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="385" y1="351" x2="377" y2="365" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="385" y1="351" x2="393" y2="365" stroke="#1E3A8A" strokeWidth={1.8} />
            <rect x="394" y="317" width="72" height="17" rx={3} fill="#F3EFE7" />
            <text x="430" y="329" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              edited (1:M)
            </text>

            {/* 7. EDITOR (1) -> BOOK_EDITOR (M) */}
            <path
              d="M 275 585 L 385 585 L 385 491"
              fill="none"
              stroke="#1C1917"
              strokeWidth={1.6}
            />
            <line x1="286" y1="577" x2="286" y2="593" stroke="#1E3A8A" strokeWidth={2} />
            <line x1="385" y1="505" x2="377" y2="491" stroke="#1E3A8A" strokeWidth={1.8} />
            <line x1="385" y1="505" x2="393" y2="491" stroke="#1E3A8A" strokeWidth={1.8} />
            <rect x="292" y="564" width="84" height="17" rx={3} fill="#F3EFE7" />
            <text x="334" y="576" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A8A" fontFamily="Plus Jakarta Sans, sans-serif">
              supervises (1:M)
            </text>

            {/* ================= ENTITY BOXES ================= */}
            <EntityBox
              x={20}
              y={45}
              w={255}
              title="PUBLISHER"
              fields={[
                { name: 'publisher_id', key: 'PK', type: 'NUMBER(5)' },
                { name: 'publisher_name', type: 'VARCHAR2(100)' },
                { name: 'city', type: 'VARCHAR2(50)' },
                { name: 'country', type: 'VARCHAR2(50)' },
                { name: 'contact_email', type: 'VARCHAR2(100)' },
                { name: 'established_year', type: 'NUMBER(4)' },
              ]}
            />

            <EntityBox
              x={405}
              y={30}
              w={290}
              title="BOOK"
              fields={[
                { name: 'book_id', key: 'PK', type: 'NUMBER(5)' },
                { name: 'isbn', type: 'VARCHAR2(20)' },
                { name: 'title', type: 'VARCHAR2(150)' },
                { name: 'edition', type: 'NUMBER(2)' },
                { name: 'publication_date', type: 'DATE' },
                { name: 'price', type: 'NUMBER(8,2)' },
                { name: 'pages', type: 'NUMBER(4)' },
                { name: 'subject_id', key: 'FK', type: 'NUMBER(5)' },
                { name: 'publisher_id', key: 'FK', type: 'NUMBER(5)' },
              ]}
            />

            <EntityBox
              x={835}
              y={50}
              w={265}
              title="SUBJECT"
              fields={[
                { name: 'subject_id', key: 'PK', type: 'NUMBER(5)' },
                { name: 'subject_name', type: 'VARCHAR2(80)' },
                { name: 'department_code', type: 'VARCHAR2(15)' },
                { name: 'description', type: 'VARCHAR2(200)' },
              ]}
            />

            <EntityBox
              x={255}
              y={365}
              w={260}
              title="BOOK_EDITOR"
              subtitle="Junction Table (M:N Resolved)"
              fields={[
                { name: 'book_id', key: 'PK,FK', type: 'NUMBER(5)' },
                { name: 'editor_id', key: 'PK,FK', type: 'NUMBER(5)' },
                { name: 'editing_stage', type: 'VARCHAR2(40)' },
                { name: 'assigned_date', type: 'DATE' },
              ]}
            />

            <EntityBox
              x={595}
              y={365}
              w={260}
              title="BOOK_AUTHOR"
              subtitle="Junction Table (M:N Resolved)"
              fields={[
                { name: 'book_id', key: 'PK,FK', type: 'NUMBER(5)' },
                { name: 'author_id', key: 'PK,FK', type: 'NUMBER(5)' },
                { name: 'author_role', type: 'VARCHAR2(30)' },
                { name: 'royalty_share', type: 'NUMBER(5,2)' },
              ]}
            />

            <EntityBox
              x={20}
              y={535}
              w={255}
              title="EDITOR"
              fields={[
                { name: 'editor_id', key: 'PK', type: 'NUMBER(5)' },
                { name: 'first_name', type: 'VARCHAR2(50)' },
                { name: 'last_name', type: 'VARCHAR2(50)' },
                { name: 'email', type: 'VARCHAR2(100)' },
                { name: 'designation', type: 'VARCHAR2(60)' },
                { name: 'experience_years', type: 'NUMBER(2)' },
              ]}
            />

            <EntityBox
              x={835}
              y={500}
              w={265}
              title="AUTHOR"
              fields={[
                { name: 'author_id', key: 'PK', type: 'NUMBER(5)' },
                { name: 'first_name', type: 'VARCHAR2(50)' },
                { name: 'last_name', type: 'VARCHAR2(50)' },
                { name: 'email', type: 'VARCHAR2(100)' },
                { name: 'qualification', type: 'VARCHAR2(60)' },
                { name: 'affiliation', type: 'VARCHAR2(100)' },
                { name: 'subject_id', key: 'FK', type: 'NUMBER(5)' },
              ]}
            />

            {/* Legend */}
            <g transform="translate(300, 690)">
              <rect width="520" height="58" rx={5} fill="#FFFFFF" stroke="#D6CEBE" />
              <text x="16" y="23" fontSize="10.5" fontWeight="700" fill="#1C1917" fontFamily="Plus Jakarta Sans, sans-serif">
                ERD Legend:
              </text>
              <text x="95" y="23" fontSize="10.5" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">
                PK
              </text>
              <text x="118" y="23" fontSize="10.5" fill="#57534E" fontFamily="Plus Jakarta Sans, sans-serif">
                Primary Key (Underlined)
              </text>
              <text x="275" y="23" fontSize="10.5" fontWeight="700" fill="#9A3412" fontFamily="JetBrains Mono, monospace">
                FK
              </text>
              <text x="298" y="23" fontSize="10.5" fill="#57534E" fontFamily="Plus Jakarta Sans, sans-serif">
                Foreign Key
              </text>
              <text x="395" y="23" fontSize="10.5" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">
                PK,FK
              </text>
              <text x="435" y="23" fontSize="10.5" fill="#57534E" fontFamily="Plus Jakarta Sans, sans-serif">
                Composite Key
              </text>
              <text x="16" y="44" fontSize="10" fill="#57534E" fontFamily="Plus Jakarta Sans, sans-serif">
                Double tick (||) denotes One (1) side; Crow’s foot (&lt;) denotes Many (M) side. M:N relationships resolved via junction tables.
              </text>
            </g>
          </svg>
        ) : (
          <svg
            viewBox="0 0 1120 720"
            className="w-full min-w-[820px] h-auto block mx-auto"
            role="img"
            aria-label="Conceptual Entity Relationship Diagram in Chen Notation for Book Publishing Company"
          >
            <defs>
              <pattern id="chen-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="#E5DFD3" />
              </pattern>
            </defs>
            <rect width="1120" height="720" fill="url(#chen-grid)" />

            {/* Connector lines */}
            {/* Publisher -- Publishes -- Book */}
            <line x1="210" y1="140" x2="310" y2="140" stroke="#1C1917" strokeWidth={1.6} />
            <line x1="420" y1="140" x2="480" y2="140" stroke="#1C1917" strokeWidth={1.6} />
            <text x="250" y="130" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">1</text>
            <text x="452" y="130" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">M</text>

            {/* Book -- Categorizes -- Subject */}
            <line x1="640" y1="140" x2="700" y2="140" stroke="#1C1917" strokeWidth={1.6} />
            <line x1="810" y1="140" x2="900" y2="140" stroke="#1C1917" strokeWidth={1.6} />
            <text x="662" y="130" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">M</text>
            <text x="860" y="130" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">1</text>

            {/* Subject -- Specializes_In -- Author */}
            <line x1="980" y1="185" x2="980" y2="295" stroke="#1C1917" strokeWidth={1.6} />
            <line x1="980" y1="365" x2="980" y2="480" stroke="#1C1917" strokeWidth={1.6} />
            <text x="992" y="235" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">1</text>
            <text x="992" y="435" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">M</text>

            {/* Book -- Writes (M:N) -- Author */}
            <line x1="600" y1="185" x2="725" y2="320" stroke="#1C1917" strokeWidth={1.6} />
            <line x1="775" y1="365" x2="900" y2="500" stroke="#1C1917" strokeWidth={1.6} />
            <text x="652" y="232" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">M</text>
            <text x="845" y="432" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">N</text>

            {/* Book -- Supervises (M:N) -- Editor */}
            <line x1="510" y1="185" x2="380" y2="320" stroke="#1C1917" strokeWidth={1.6} />
            <line x1="330" y1="365" x2="210" y2="500" stroke="#1C1917" strokeWidth={1.6} />
            <text x="452" y="232" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">M</text>
            <text x="262" y="432" fontSize="11" fontWeight="700" fill="#1E3A8A" fontFamily="JetBrains Mono, monospace">N</text>

            {/* Diamonds */}
            <Diamond cx={365} cy={140} rx={58} ry={32} label="Publishes" sublabel="1 : M" />
            <Diamond cx={755} cy={140} rx={58} ry={32} label="Belongs_To" sublabel="M : 1" />
            <Diamond cx={980} cy={330} rx={68} ry={35} label="Specializes" sublabel="1 : M" />
            <Diamond cx={748} cy={340} rx={68} ry={36} label="Authored_By" sublabel="M : N (Book_Author)" />
            <Diamond cx={356} cy={340} rx={68} ry={36} label="Edited_By" sublabel="M : N (Book_Editor)" />

            {/* Associative attribute callouts on M:N diamonds */}
            <line x1="356" y1="376" x2="356" y2="420" stroke="#9A3412" strokeDasharray="3 3" strokeWidth={1.3} />
            <rect x="266" y="420" width="180" height="44" rx={22} fill="#FFF7ED" stroke="#9A3412" strokeWidth={1.2} />
            <text x="356" y="439" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9A3412" fontFamily="JetBrains Mono, monospace">
              editing_stage
            </text>
            <text x="356" y="454" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9A3412" fontFamily="JetBrains Mono, monospace">
              assigned_date
            </text>

            <line x1="748" y1="376" x2="748" y2="420" stroke="#9A3412" strokeDasharray="3 3" strokeWidth={1.3} />
            <rect x="658" y="420" width="180" height="44" rx={22} fill="#FFF7ED" stroke="#9A3412" strokeWidth={1.2} />
            <text x="748" y="439" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9A3412" fontFamily="JetBrains Mono, monospace">
              author_role
            </text>
            <text x="748" y="454" textAnchor="middle" fontSize="10" fontWeight="600" fill="#9A3412" fontFamily="JetBrains Mono, monospace">
              royalty_share
            </text>

            {/* Entity Rectangles + Attribute Bubbles */}
            {/* PUBLISHER */}
            <rect x={45} y={102} width={165} height={76} rx={4} fill="#1E3A8A" />
            <text x={127} y={132} textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              PUBLISHER
            </text>
            <text x={127} y={152} textAnchor="middle" fill="#DBEAFE" fontSize="10" fontFamily="JetBrains Mono, monospace" textDecoration="underline">
              PK: publisher_id
            </text>
            <text x={127} y={168} textAnchor="middle" fill="#DBEAFE" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
              name, city, country, email, year
            </text>

            {/* BOOK */}
            <rect x={480} y={96} width={160} height={88} rx={4} fill="#1E3A8A" />
            <text x={560} y={124} textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              BOOK
            </text>
            <text x={560} y={143} textAnchor="middle" fill="#DBEAFE" fontSize="10" fontFamily="JetBrains Mono, monospace" textDecoration="underline">
              PK: book_id
            </text>
            <text x={560} y={158} textAnchor="middle" fill="#FDE68A" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
              FK: subject_id, publisher_id
            </text>
            <text x={560} y={173} textAnchor="middle" fill="#DBEAFE" fontSize="9" fontFamily="Plus Jakarta Sans, sans-serif">
              isbn, title, edition, date, price, pages
            </text>

            {/* SUBJECT */}
            <rect x={900} y={102} width={170} height={80} rx={4} fill="#1E3A8A" />
            <text x={985} y={132} textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              SUBJECT
            </text>
            <text x={985} y={152} textAnchor="middle" fill="#DBEAFE" fontSize="10" fontFamily="JetBrains Mono, monospace" textDecoration="underline">
              PK: subject_id
            </text>
            <text x={985} y={168} textAnchor="middle" fill="#DBEAFE" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
              subject_name, dept_code, desc
            </text>

            {/* EDITOR */}
            <rect x={45} y={500} width={185} height={84} rx={4} fill="#1E3A8A" />
            <text x={137} y={529} textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              EDITOR
            </text>
            <text x={137} y={548} textAnchor="middle" fill="#DBEAFE" fontSize="10" fontFamily="JetBrains Mono, monospace" textDecoration="underline">
              PK: editor_id
            </text>
            <text x={137} y={566} textAnchor="middle" fill="#DBEAFE" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
              first_name, last_name, email,
            </text>
            <text x={137} y={578} textAnchor="middle" fill="#DBEAFE" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
              designation, experience_years
            </text>

            {/* AUTHOR */}
            <rect x={885} y={482} width={190} height={92} rx={4} fill="#1E3A8A" />
            <text x={980} y={510} textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              AUTHOR
            </text>
            <text x={980} y={529} textAnchor="middle" fill="#DBEAFE" fontSize="10" fontFamily="JetBrains Mono, monospace" textDecoration="underline">
              PK: author_id
            </text>
            <text x={980} y={545} textAnchor="middle" fill="#FDE68A" fontSize="9.5" fontFamily="JetBrains Mono, monospace">
              FK: subject_id
            </text>
            <text x={980} y={562} textAnchor="middle" fill="#DBEAFE" fontSize="9.5" fontFamily="Plus Jakarta Sans, sans-serif">
              name, email, qualification, affiliation
            </text>

            {/* Footer note */}
            <rect x={260} y={635} width={600} height="52" rx={5} fill="#FFFFFF" stroke="#D6CEBE" />
            <text x={560} y="657" textAnchor="middle" fontSize="11" fontWeight="600" fill="#1C1917" fontFamily="Plus Jakarta Sans, sans-serif">
              Conceptual Chen ER Model — 5 Strong Entities + 2 Associative M:N Relationships
            </text>
            <text x={560} y="674" textAnchor="middle" fontSize="10" fill="#57534E" fontFamily="Plus Jakarta Sans, sans-serif">
              Switch to &quot;Logical Schema (7 Entities)&quot; above to inspect the resolved junction tables BOOK_AUTHOR and BOOK_EDITOR.
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}

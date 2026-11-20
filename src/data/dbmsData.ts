export interface Publisher {
  publisher_id: number;
  publisher_name: string;
  city: string;
  country: string;
  contact_email: string;
  established_year: number;
}

export interface Subject {
  subject_id: number;
  subject_name: string;
  department_code: string;
  description: string;
}

export interface Author {
  author_id: number;
  first_name: string;
  last_name: string;
  email: string;
  qualification: string;
  affiliation: string;
  subject_id: number;
}

export interface Editor {
  editor_id: number;
  first_name: string;
  last_name: string;
  email: string;
  designation: string;
  experience_years: number;
}

export interface Book {
  book_id: number;
  isbn: string;
  title: string;
  edition: number;
  publication_date: string; // YYYY-MM-DD
  price: number;
  pages: number;
  subject_id: number;
  publisher_id: number;
}

export interface BookAuthor {
  book_id: number;
  author_id: number;
  author_role: string;
  royalty_share: number;
}

export interface BookEditor {
  book_id: number;
  editor_id: number;
  editing_stage: string;
  assigned_date: string; // YYYY-MM-DD
}

export interface EntityAttribute {
  name: string;
  type: string;
  keyType: 'PK' | 'FK' | 'PK, FK' | '—';
  constraints: string;
  description: string;
}

export interface EntitySpec {
  id: string;
  name: string;
  tableName: string;
  role: string;
  attributes: EntityAttribute[];
}

export interface QuerySpec {
  id: number;
  title: string;
  purpose: string;
  conceptTag: string;
  sql: string;
  columns: string[];
  rows: (string | number)[][];
}

export interface VivaQuestion {
  id: number;
  question: string;
  answer: string;
  topic: string;
}

// ============================================================================
// SAMPLE DATASET (100% synchronized with SQL INSERT statements & query outputs)
// ============================================================================

export const PUBLISHERS: Publisher[] = [
  {
    publisher_id: 101,
    publisher_name: 'Apex Scientific Press',
    city: 'New Delhi',
    country: 'India',
    contact_email: 'editorial@apexscientific.in',
    established_year: 1998,
  },
  {
    publisher_id: 102,
    publisher_name: 'Meridian Academic House',
    city: 'Boston',
    country: 'USA',
    contact_email: 'submissions@meridianpress.edu',
    established_year: 1985,
  },
  {
    publisher_id: 103,
    publisher_name: 'Oxford Tech Publications',
    city: 'London',
    country: 'UK',
    contact_email: 'desk@oxfordtechpub.co.uk',
    established_year: 1974,
  },
];

export const SUBJECTS: Subject[] = [
  {
    subject_id: 201,
    subject_name: 'Database Systems',
    department_code: 'CS-301',
    description: 'Relational models, SQL, indexing, and transaction management',
  },
  {
    subject_id: 202,
    subject_name: 'Artificial Intelligence',
    department_code: 'CS-402',
    description: 'Search algorithms, reasoning, and machine learning',
  },
  {
    subject_id: 203,
    subject_name: 'Quantum Physics',
    department_code: 'PH-310',
    description: 'Wave mechanics, quantum states, and particle theory',
  },
  {
    subject_id: 204,
    subject_name: 'Organic Chemistry',
    department_code: 'CH-205',
    description: 'Carbon compounds, synthesis, and reaction mechanisms',
  },
  {
    subject_id: 205,
    subject_name: 'Molecular Biology',
    department_code: 'BI-304',
    description: 'DNA replication, genetics, and cellular pathways',
  },
  {
    subject_id: 206,
    subject_name: 'Linear Algebra',
    department_code: 'MA-201',
    description: 'Vector spaces, matrices, and eigenvalues',
  },
  {
    subject_id: 207,
    subject_name: 'Operating Systems',
    department_code: 'CS-302',
    description: 'Process scheduling, memory management, and file systems',
  },
  {
    subject_id: 208,
    subject_name: 'Control Engineering',
    department_code: 'EE-308',
    description: 'Feedback systems, stability, and PID controllers',
  },
];

export const AUTHORS: Author[] = [
  {
    author_id: 301,
    first_name: 'Dr. Rajesh',
    last_name: 'Sharma',
    email: 'r.sharma@iitd.ac.in',
    qualification: 'Ph.D. Computer Science',
    affiliation: 'IIT Delhi',
    subject_id: 201,
  },
  {
    author_id: 302,
    first_name: 'Prof. Anita',
    last_name: 'Desai',
    email: 'anita.desai@iisc.ac.in',
    qualification: 'Ph.D. Machine Learning',
    affiliation: 'IISc Bengaluru',
    subject_id: 202,
  },
  {
    author_id: 303,
    first_name: 'Dr. Vikram',
    last_name: 'Mehta',
    email: 'v.mehta@tifr.res.in',
    qualification: 'Ph.D. Theoretical Physics',
    affiliation: 'TIFR Mumbai',
    subject_id: 203,
  },
  {
    author_id: 304,
    first_name: 'Dr. Elena',
    last_name: 'Rostova',
    email: 'e.rostova@mit.edu',
    qualification: 'Ph.D. Chemical Sciences',
    affiliation: 'MIT',
    subject_id: 204,
  },
  {
    author_id: 305,
    first_name: 'Prof. Samuel',
    last_name: 'Okafor',
    email: 's.okafor@oxford.ac.uk',
    qualification: 'Ph.D. Biochemistry',
    affiliation: 'University of Oxford',
    subject_id: 205,
  },
  {
    author_id: 306,
    first_name: 'Dr. Priya',
    last_name: 'Nair',
    email: 'priya.nair@nitk.ac.in',
    qualification: 'Ph.D. Applied Mathematics',
    affiliation: 'NIT Surathkal',
    subject_id: 206,
  },
  {
    author_id: 307,
    first_name: 'Prof. Marcus',
    last_name: 'Vance',
    email: 'm.vance@stanford.edu',
    qualification: 'Ph.D. Distributed Systems',
    affiliation: 'Stanford University',
    subject_id: 207,
  },
  {
    author_id: 308,
    first_name: 'Dr. Kavita',
    last_name: 'Kulkarni',
    email: 'k.kulkarni@iitm.ac.in',
    qualification: 'Ph.D. Control Systems',
    affiliation: 'IIT Madras',
    subject_id: 208,
  },
  {
    author_id: 309,
    first_name: 'Dr. Arvind',
    last_name: 'Subramanian',
    email: 'arvind.s@annauniv.edu',
    qualification: 'Ph.D. Data Engineering',
    affiliation: 'Anna University',
    subject_id: 201,
  },
  {
    author_id: 310,
    first_name: 'Prof. Hannah',
    last_name: 'Lindqvist',
    email: 'h.lindqvist@kth.se',
    qualification: 'Ph.D. Neural Networks',
    affiliation: 'KTH Royal Institute',
    subject_id: 202,
  },
];

export const EDITORS: Editor[] = [
  {
    editor_id: 401,
    first_name: 'Meera',
    last_name: 'Iyer',
    email: 'meera.iyer@apexscientific.in',
    designation: 'Senior Managing Editor',
    experience_years: 14,
  },
  {
    editor_id: 402,
    first_name: 'Jonathan',
    last_name: 'Blake',
    email: 'j.blake@meridianpress.edu',
    designation: 'Lead Science Editor',
    experience_years: 11,
  },
  {
    editor_id: 403,
    first_name: 'Siddharth',
    last_name: 'Verma',
    email: 's.verma@apexscientific.in',
    designation: 'Technical Copy Editor',
    experience_years: 7,
  },
  {
    editor_id: 404,
    first_name: 'Claire',
    last_name: 'Beaumont',
    email: 'c.beaumont@oxfordtechpub.co.uk',
    designation: 'Acquisitions Editor',
    experience_years: 16,
  },
  {
    editor_id: 405,
    first_name: 'Rohan',
    last_name: 'Banerjee',
    email: 'r.banerjee@meridianpress.edu',
    designation: 'Associate Desk Editor',
    experience_years: 5,
  },
];

export const BOOKS: Book[] = [
  {
    book_id: 501,
    isbn: '978-93-5014-101-1',
    title: 'Fundamentals of Relational Databases',
    edition: 3,
    publication_date: '2022-07-15',
    price: 650.0,
    pages: 540,
    subject_id: 201,
    publisher_id: 101,
  },
  {
    book_id: 502,
    isbn: '978-0-262-04512-4',
    title: 'Foundations of Statistical AI',
    edition: 2,
    publication_date: '2023-03-10',
    price: 890.0,
    pages: 620,
    subject_id: 202,
    publisher_id: 102,
  },
  {
    book_id: 503,
    isbn: '978-0-198-75420-8',
    title: 'Modern Quantum Mechanics',
    edition: 4,
    publication_date: '2021-11-20',
    price: 950.0,
    pages: 710,
    subject_id: 203,
    publisher_id: 103,
  },
  {
    book_id: 504,
    isbn: '978-0-262-09123-7',
    title: 'Reaction Mechanisms in Organic Synthesis',
    edition: 1,
    publication_date: '2024-01-18',
    price: 780.0,
    pages: 480,
    subject_id: 204,
    publisher_id: 102,
  },
  {
    book_id: 505,
    isbn: '978-0-198-81234-5',
    title: 'Cellular Genetics and Molecular Pathways',
    edition: 2,
    publication_date: '2022-09-05',
    price: 820.0,
    pages: 590,
    subject_id: 205,
    publisher_id: 103,
  },
  {
    book_id: 506,
    isbn: '978-93-5014-205-6',
    title: 'Applied Linear Algebra for Engineers',
    edition: 3,
    publication_date: '2020-05-12',
    price: 540.0,
    pages: 410,
    subject_id: 206,
    publisher_id: 101,
  },
  {
    book_id: 507,
    isbn: '978-0-262-07741-5',
    title: 'Operating System Internals and Kernels',
    edition: 5,
    publication_date: '2023-08-22',
    price: 920.0,
    pages: 680,
    subject_id: 207,
    publisher_id: 102,
  },
  {
    book_id: 508,
    isbn: '978-93-5014-312-1',
    title: 'Feedback Control Systems Design',
    edition: 2,
    publication_date: '2021-02-14',
    price: 690.0,
    pages: 460,
    subject_id: 208,
    publisher_id: 101,
  },
  {
    book_id: 509,
    isbn: '978-93-5014-418-0',
    title: 'Distributed Database Architecture',
    edition: 1,
    publication_date: '2024-04-09',
    price: 795.0,
    pages: 525,
    subject_id: 201,
    publisher_id: 101,
  },
  {
    book_id: 510,
    isbn: '978-0-198-90345-2',
    title: 'Deep Neural Architectures',
    edition: 1,
    publication_date: '2025-01-25',
    price: 1050.0,
    pages: 640,
    subject_id: 202,
    publisher_id: 103,
  },
];

export const BOOK_AUTHORS: BookAuthor[] = [
  { book_id: 501, author_id: 301, author_role: 'Lead Author', royalty_share: 60.0 },
  { book_id: 501, author_id: 309, author_role: 'Co-Author', royalty_share: 40.0 },
  { book_id: 502, author_id: 302, author_role: 'Lead Author', royalty_share: 55.0 },
  { book_id: 502, author_id: 310, author_role: 'Co-Author', royalty_share: 45.0 },
  { book_id: 503, author_id: 303, author_role: 'Lead Author', royalty_share: 100.0 },
  { book_id: 504, author_id: 304, author_role: 'Lead Author', royalty_share: 100.0 },
  { book_id: 505, author_id: 305, author_role: 'Lead Author', royalty_share: 100.0 },
  { book_id: 506, author_id: 306, author_role: 'Lead Author', royalty_share: 100.0 },
  { book_id: 507, author_id: 307, author_role: 'Lead Author', royalty_share: 70.0 },
  { book_id: 507, author_id: 301, author_role: 'Co-Author', royalty_share: 30.0 },
  { book_id: 508, author_id: 308, author_role: 'Lead Author', royalty_share: 100.0 },
  { book_id: 509, author_id: 309, author_role: 'Lead Author', royalty_share: 60.0 },
  { book_id: 509, author_id: 301, author_role: 'Co-Author', royalty_share: 40.0 },
  { book_id: 510, author_id: 310, author_role: 'Lead Author', royalty_share: 50.0 },
  { book_id: 510, author_id: 302, author_role: 'Co-Author', royalty_share: 50.0 },
];

export const BOOK_EDITORS: BookEditor[] = [
  { book_id: 501, editor_id: 401, editing_stage: 'Technical Review', assigned_date: '2022-03-10' },
  { book_id: 501, editor_id: 403, editing_stage: 'Copy Editing', assigned_date: '2022-05-01' },
  { book_id: 502, editor_id: 402, editing_stage: 'Technical Review', assigned_date: '2022-11-15' },
  { book_id: 503, editor_id: 404, editing_stage: 'Final Proofing', assigned_date: '2021-08-20' },
  { book_id: 504, editor_id: 402, editing_stage: 'Technical Review', assigned_date: '2023-09-12' },
  { book_id: 504, editor_id: 405, editing_stage: 'Copy Editing', assigned_date: '2023-11-04' },
  { book_id: 505, editor_id: 404, editing_stage: 'Technical Review', assigned_date: '2022-05-18' },
  { book_id: 506, editor_id: 401, editing_stage: 'Final Proofing', assigned_date: '2020-02-01' },
  { book_id: 507, editor_id: 402, editing_stage: 'Technical Review', assigned_date: '2023-04-10' },
  { book_id: 508, editor_id: 403, editing_stage: 'Copy Editing', assigned_date: '2020-11-12' },
  { book_id: 509, editor_id: 401, editing_stage: 'Technical Review', assigned_date: '2024-01-10' },
  { book_id: 509, editor_id: 403, editing_stage: 'Final Proofing', assigned_date: '2024-02-22' },
  { book_id: 510, editor_id: 404, editing_stage: 'Technical Review', assigned_date: '2024-10-05' },
];

// ============================================================================
// SECTION 5: ENTITIES AND ATTRIBUTES SPECIFICATION
// ============================================================================

export const ENTITIES_SPEC: EntitySpec[] = [
  {
    id: 'publisher',
    name: 'Publisher',
    tableName: 'PUBLISHER',
    role: 'Stores publishing house branches/imprints that finance, print, and distribute scientific books.',
    attributes: [
      { name: 'publisher_id', type: 'NUMBER(5)', keyType: 'PK', constraints: 'PRIMARY KEY', description: 'Unique identifier for each publisher' },
      { name: 'publisher_name', type: 'VARCHAR2(100)', keyType: '—', constraints: 'NOT NULL, UNIQUE', description: 'Registered name of the publishing house' },
      { name: 'city', type: 'VARCHAR2(50)', keyType: '—', constraints: 'NOT NULL', description: 'Headquarters city' },
      { name: 'country', type: 'VARCHAR2(50)', keyType: '—', constraints: 'NOT NULL', description: 'Headquarters country' },
      { name: 'contact_email', type: 'VARCHAR2(100)', keyType: '—', constraints: 'NOT NULL, UNIQUE', description: 'Official editorial contact email' },
      { name: 'established_year', type: 'NUMBER(4)', keyType: '—', constraints: 'CHECK (>= 1800)', description: 'Year the publisher was founded' },
    ],
  },
  {
    id: 'subject',
    name: 'Subject',
    tableName: 'SUBJECT',
    role: 'Categorizes scientific disciplines covered by the company and defines author specializations.',
    attributes: [
      { name: 'subject_id', type: 'NUMBER(5)', keyType: 'PK', constraints: 'PRIMARY KEY', description: 'Unique identifier for each scientific subject' },
      { name: 'subject_name', type: 'VARCHAR2(80)', keyType: '—', constraints: 'NOT NULL, UNIQUE', description: 'Official discipline title' },
      { name: 'department_code', type: 'VARCHAR2(15)', keyType: '—', constraints: 'NOT NULL', description: 'Academic classification code (e.g., CS-301)' },
      { name: 'description', type: 'VARCHAR2(200)', keyType: '—', constraints: 'NULLABLE', description: 'Scope and topics of the subject' },
    ],
  },
  {
    id: 'author',
    name: 'Author',
    tableName: 'AUTHOR',
    role: 'Represents subject-matter experts and researchers who write scientific manuscripts.',
    attributes: [
      { name: 'author_id', type: 'NUMBER(5)', keyType: 'PK', constraints: 'PRIMARY KEY', description: 'Unique identifier for each author' },
      { name: 'first_name', type: 'VARCHAR2(50)', keyType: '—', constraints: 'NOT NULL', description: 'Title and given name of the author' },
      { name: 'last_name', type: 'VARCHAR2(50)', keyType: '—', constraints: 'NOT NULL', description: 'Surname of the author' },
      { name: 'email', type: 'VARCHAR2(100)', keyType: '—', constraints: 'NOT NULL, UNIQUE', description: 'Academic email address' },
      { name: 'qualification', type: 'VARCHAR2(60)', keyType: '—', constraints: 'NOT NULL', description: 'Highest academic degree' },
      { name: 'affiliation', type: 'VARCHAR2(100)', keyType: '—', constraints: 'NULLABLE', description: 'University or research institute' },
      { name: 'subject_id', type: 'NUMBER(5)', keyType: 'FK', constraints: 'NOT NULL, REFERENCES SUBJECT', description: 'Primary subject specialization of the author' },
    ],
  },
  {
    id: 'editor',
    name: 'Editor',
    tableName: 'EDITOR',
    role: 'Stores editorial staff responsible for reviewing, copy-editing, and approving books.',
    attributes: [
      { name: 'editor_id', type: 'NUMBER(5)', keyType: 'PK', constraints: 'PRIMARY KEY', description: 'Unique identifier for each editor' },
      { name: 'first_name', type: 'VARCHAR2(50)', keyType: '—', constraints: 'NOT NULL', description: 'Editor first name' },
      { name: 'last_name', type: 'VARCHAR2(50)', keyType: '—', constraints: 'NOT NULL', description: 'Editor surname' },
      { name: 'email', type: 'VARCHAR2(100)', keyType: '—', constraints: 'NOT NULL, UNIQUE', description: 'Corporate editorial email' },
      { name: 'designation', type: 'VARCHAR2(60)', keyType: '—', constraints: 'NOT NULL', description: 'Editorial role or seniority title' },
      { name: 'experience_years', type: 'NUMBER(2)', keyType: '—', constraints: 'NOT NULL, CHECK (>= 0)', description: 'Years of scientific publishing experience' },
    ],
  },
  {
    id: 'book',
    name: 'Book',
    tableName: 'BOOK',
    role: 'Core catalog entity capturing bibliographic metadata, pricing, subject, and publisher.',
    attributes: [
      { name: 'book_id', type: 'NUMBER(5)', keyType: 'PK', constraints: 'PRIMARY KEY', description: 'Unique internal catalog ID' },
      { name: 'isbn', type: 'VARCHAR2(20)', keyType: '—', constraints: 'NOT NULL, UNIQUE', description: '13-digit International Standard Book Number' },
      { name: 'title', type: 'VARCHAR2(150)', keyType: '—', constraints: 'NOT NULL', description: 'Full published title of the book' },
      { name: 'edition', type: 'NUMBER(2)', keyType: '—', constraints: 'NOT NULL, CHECK (>= 1)', description: 'Edition number' },
      { name: 'publication_date', type: 'DATE', keyType: '—', constraints: 'NOT NULL', description: 'Official release date' },
      { name: 'price', type: 'NUMBER(8,2)', keyType: '—', constraints: 'NOT NULL, CHECK (> 0)', description: 'Retail price in INR' },
      { name: 'pages', type: 'NUMBER(4)', keyType: '—', constraints: 'NOT NULL, CHECK (> 0)', description: 'Total page count' },
      { name: 'subject_id', type: 'NUMBER(5)', keyType: 'FK', constraints: 'NOT NULL, REFERENCES SUBJECT', description: 'Subject classification of the book' },
      { name: 'publisher_id', type: 'NUMBER(5)', keyType: 'FK', constraints: 'NOT NULL, REFERENCES PUBLISHER', description: 'Publishing house releasing the book' },
    ],
  },
  {
    id: 'book_author',
    name: 'Book_Author',
    tableName: 'BOOK_AUTHOR',
    role: 'Associative entity resolving the M:N relationship between Books and Authors, recording contribution role and royalty share.',
    attributes: [
      { name: 'book_id', type: 'NUMBER(5)', keyType: 'PK, FK', constraints: 'COMPOSITE PK, REFERENCES BOOK', description: 'Book being authored' },
      { name: 'author_id', type: 'NUMBER(5)', keyType: 'PK, FK', constraints: 'COMPOSITE PK, REFERENCES AUTHOR', description: 'Contributing author' },
      { name: 'author_role', type: 'VARCHAR2(30)', keyType: '—', constraints: 'NOT NULL', description: 'Contribution role (Lead Author / Co-Author)' },
      { name: 'royalty_share', type: 'NUMBER(5,2)', keyType: '—', constraints: 'NOT NULL, CHECK (0 < x <= 100)', description: 'Percentage of book royalty allocated' },
    ],
  },
  {
    id: 'book_editor',
    name: 'Book_Editor',
    tableName: 'BOOK_EDITOR',
    role: 'Associative entity resolving the M:N relationship between Books and Editors, tracking editorial stage and assignment date.',
    attributes: [
      { name: 'book_id', type: 'NUMBER(5)', keyType: 'PK, FK', constraints: 'COMPOSITE PK, REFERENCES BOOK', description: 'Book under editorial supervision' },
      { name: 'editor_id', type: 'NUMBER(5)', keyType: 'PK, FK', constraints: 'COMPOSITE PK, REFERENCES EDITOR', description: 'Supervising editor' },
      { name: 'editing_stage', type: 'VARCHAR2(40)', keyType: '—', constraints: 'NOT NULL', description: 'Stage supervised (Technical Review, Copy Editing, Final Proofing)' },
      { name: 'assigned_date', type: 'DATE', keyType: '—', constraints: 'NOT NULL', description: 'Date editor was assigned to the manuscript' },
    ],
  },
];

// ============================================================================
// SECTION 10: ORACLE SQL DDL SCRIPT (CREATE TABLE)
// ============================================================================

export const ORACLE_DDL_SQL = `-- ============================================================================
-- EXPERIMENT 10: BOOK PUBLISHING COMPANY
-- ORACLE SQL DDL SCRIPT (TABLES CREATED IN DEPENDENCY ORDER)
-- ============================================================================

-- 1. Create PUBLISHER Table (Parent Table - No Foreign Keys)
CREATE TABLE PUBLISHER (
    publisher_id      NUMBER(5)      CONSTRAINT pk_publisher PRIMARY KEY,
    publisher_name    VARCHAR2(100)  CONSTRAINT nn_pub_name NOT NULL
                                     CONSTRAINT uq_pub_name UNIQUE,
    city              VARCHAR2(50)   CONSTRAINT nn_pub_city NOT NULL,
    country           VARCHAR2(50)   CONSTRAINT nn_pub_country NOT NULL,
    contact_email     VARCHAR2(100)  CONSTRAINT nn_pub_email NOT NULL
                                     CONSTRAINT uq_pub_email UNIQUE,
    established_year  NUMBER(4)      CONSTRAINT chk_pub_year CHECK (established_year >= 1800)
);

-- 2. Create SUBJECT Table (Parent Table - No Foreign Keys)
CREATE TABLE SUBJECT (
    subject_id        NUMBER(5)      CONSTRAINT pk_subject PRIMARY KEY,
    subject_name      VARCHAR2(80)   CONSTRAINT nn_subj_name NOT NULL
                                     CONSTRAINT uq_subj_name UNIQUE,
    department_code   VARCHAR2(15)   CONSTRAINT nn_subj_dept NOT NULL,
    description       VARCHAR2(200)
);

-- 3. Create AUTHOR Table (References SUBJECT)
CREATE TABLE AUTHOR (
    author_id         NUMBER(5)      CONSTRAINT pk_author PRIMARY KEY,
    first_name        VARCHAR2(50)   CONSTRAINT nn_auth_fname NOT NULL,
    last_name         VARCHAR2(50)   CONSTRAINT nn_auth_lname NOT NULL,
    email             VARCHAR2(100)  CONSTRAINT nn_auth_email NOT NULL
                                     CONSTRAINT uq_auth_email UNIQUE,
    qualification     VARCHAR2(60)   CONSTRAINT nn_auth_qual NOT NULL,
    affiliation       VARCHAR2(100),
    subject_id        NUMBER(5)      CONSTRAINT nn_auth_subj NOT NULL,
    CONSTRAINT fk_author_subject FOREIGN KEY (subject_id)
        REFERENCES SUBJECT (subject_id)
);

-- 4. Create EDITOR Table (Parent Table - No Foreign Keys)
CREATE TABLE EDITOR (
    editor_id         NUMBER(5)      CONSTRAINT pk_editor PRIMARY KEY,
    first_name        VARCHAR2(50)   CONSTRAINT nn_ed_fname NOT NULL,
    last_name         VARCHAR2(50)   CONSTRAINT nn_ed_lname NOT NULL,
    email             VARCHAR2(100)  CONSTRAINT nn_ed_email NOT NULL
                                     CONSTRAINT uq_ed_email UNIQUE,
    designation       VARCHAR2(60)   CONSTRAINT nn_ed_desig NOT NULL,
    experience_years  NUMBER(2)      CONSTRAINT nn_ed_exp NOT NULL
                                     CONSTRAINT chk_ed_exp CHECK (experience_years >= 0)
);

-- 5. Create BOOK Table (References SUBJECT and PUBLISHER)
CREATE TABLE BOOK (
    book_id           NUMBER(5)      CONSTRAINT pk_book PRIMARY KEY,
    isbn              VARCHAR2(20)   CONSTRAINT nn_book_isbn NOT NULL
                                     CONSTRAINT uq_book_isbn UNIQUE,
    title             VARCHAR2(150)  CONSTRAINT nn_book_title NOT NULL,
    edition           NUMBER(2)      CONSTRAINT nn_book_edition NOT NULL
                                     CONSTRAINT chk_book_edition CHECK (edition >= 1),
    publication_date  DATE           CONSTRAINT nn_book_pubdate NOT NULL,
    price             NUMBER(8,2)    CONSTRAINT nn_book_price NOT NULL
                                     CONSTRAINT chk_book_price CHECK (price > 0),
    pages             NUMBER(4)      CONSTRAINT nn_book_pages NOT NULL
                                     CONSTRAINT chk_book_pages CHECK (pages > 0),
    subject_id        NUMBER(5)      CONSTRAINT nn_book_subj NOT NULL,
    publisher_id      NUMBER(5)      CONSTRAINT nn_book_pub NOT NULL,
    CONSTRAINT fk_book_subject FOREIGN KEY (subject_id)
        REFERENCES SUBJECT (subject_id),
    CONSTRAINT fk_book_publisher FOREIGN KEY (publisher_id)
        REFERENCES PUBLISHER (publisher_id)
);

-- 6. Create BOOK_AUTHOR Junction Table (References BOOK and AUTHOR)
CREATE TABLE BOOK_AUTHOR (
    book_id           NUMBER(5),
    author_id         NUMBER(5),
    author_role       VARCHAR2(30)   CONSTRAINT nn_ba_role NOT NULL,
    royalty_share     NUMBER(5,2)    CONSTRAINT nn_ba_royalty NOT NULL
                                     CONSTRAINT chk_ba_royalty CHECK (royalty_share > 0 AND royalty_share <= 100),
    CONSTRAINT pk_book_author PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_ba_book FOREIGN KEY (book_id)
        REFERENCES BOOK (book_id) ON DELETE CASCADE,
    CONSTRAINT fk_ba_author FOREIGN KEY (author_id)
        REFERENCES AUTHOR (author_id) ON DELETE CASCADE
);

-- 7. Create BOOK_EDITOR Junction Table (References BOOK and EDITOR)
CREATE TABLE BOOK_EDITOR (
    book_id           NUMBER(5),
    editor_id         NUMBER(5),
    editing_stage     VARCHAR2(40)   CONSTRAINT nn_be_stage NOT NULL,
    assigned_date     DATE           CONSTRAINT nn_be_date NOT NULL,
    CONSTRAINT pk_book_editor PRIMARY KEY (book_id, editor_id),
    CONSTRAINT fk_be_book FOREIGN KEY (book_id)
        REFERENCES BOOK (book_id) ON DELETE CASCADE,
    CONSTRAINT fk_be_editor FOREIGN KEY (editor_id)
        REFERENCES EDITOR (editor_id) ON DELETE CASCADE
);`;

// ============================================================================
// SECTION 11: ORACLE SQL DML SCRIPT (GENERATED DIRECTLY FROM ARRAYS)
// ============================================================================

const esc = (val: string) => val.replace(/'/g, "''");

export const ORACLE_DML_SQL = [
  '-- ============================================================================',
  '-- EXPERIMENT 10: BOOK PUBLISHING COMPANY',
  '-- ORACLE SQL DML SCRIPT (SAMPLE DATA INSERTION)',
  '-- ============================================================================',
  '',
  '-- 1. Insert 3 Publishers',
  ...PUBLISHERS.map(
    (p) =>
      `INSERT INTO PUBLISHER VALUES (${p.publisher_id}, '${esc(p.publisher_name)}', '${esc(p.city)}', '${esc(p.country)}', '${esc(p.contact_email)}', ${p.established_year});`
  ),
  '',
  '-- 2. Insert 8 Subjects',
  ...SUBJECTS.map(
    (s) =>
      `INSERT INTO SUBJECT VALUES (${s.subject_id}, '${esc(s.subject_name)}', '${esc(s.department_code)}', '${esc(s.description)}');`
  ),
  '',
  '-- 3. Insert 10 Authors',
  ...AUTHORS.map(
    (a) =>
      `INSERT INTO AUTHOR VALUES (${a.author_id}, '${esc(a.first_name)}', '${esc(a.last_name)}', '${esc(a.email)}', '${esc(a.qualification)}', '${esc(a.affiliation)}', ${a.subject_id});`
  ),
  '',
  '-- 4. Insert 5 Editors',
  ...EDITORS.map(
    (e) =>
      `INSERT INTO EDITOR VALUES (${e.editor_id}, '${esc(e.first_name)}', '${esc(e.last_name)}', '${esc(e.email)}', '${esc(e.designation)}', ${e.experience_years});`
  ),
  '',
  '-- 5. Insert 10 Books',
  ...BOOKS.map(
    (b) =>
      `INSERT INTO BOOK VALUES (${b.book_id}, '${esc(b.isbn)}', '${esc(b.title)}', ${b.edition}, TO_DATE('${b.publication_date}', 'YYYY-MM-DD'), ${b.price.toFixed(2)}, ${b.pages}, ${b.subject_id}, ${b.publisher_id});`
  ),
  '',
  '-- 6. Insert 15 Book_Author Assignments',
  ...BOOK_AUTHORS.map(
    (ba) =>
      `INSERT INTO BOOK_AUTHOR VALUES (${ba.book_id}, ${ba.author_id}, '${esc(ba.author_role)}', ${ba.royalty_share.toFixed(2)});`
  ),
  '',
  '-- 7. Insert 13 Book_Editor Assignments',
  ...BOOK_EDITORS.map(
    (be) =>
      `INSERT INTO BOOK_EDITOR VALUES (${be.book_id}, ${be.editor_id}, '${esc(be.editing_stage)}', TO_DATE('${be.assigned_date}', 'YYYY-MM-DD'));`
  ),
  '',
  'COMMIT;',
].join('\n');

// ============================================================================
// SECTION 12: 15 ORACLE SQL QUERIES + MATHEMATICALLY VERIFIED OUTPUTS
// ============================================================================

const subjectById = new Map(SUBJECTS.map((s) => [s.subject_id, s]));
const publisherById = new Map(PUBLISHERS.map((p) => [p.publisher_id, p]));
const authorById = new Map(AUTHORS.map((a) => [a.author_id, a]));
const editorById = new Map(EDITORS.map((e) => [e.editor_id, e]));
const bookById = new Map(BOOKS.map((b) => [b.book_id, b]));

export const SQL_QUERIES: QuerySpec[] = [
  {
    id: 1,
    title: 'Display all books',
    purpose: 'Retrieve the complete catalog of all scientific books stored in the BOOK table.',
    conceptTag: 'Basic SELECT',
    sql: `SELECT book_id,
       isbn,
       title,
       edition,
       TO_CHAR(publication_date, 'YYYY-MM-DD') AS pub_date,
       price,
       pages
FROM BOOK
ORDER BY book_id;`,
    columns: ['BOOK_ID', 'ISBN', 'TITLE', 'EDITION', 'PUB_DATE', 'PRICE', 'PAGES'],
    rows: BOOKS.slice()
      .sort((a, b) => a.book_id - b.book_id)
      .map((b) => [b.book_id, b.isbn, b.title, b.edition, b.publication_date, b.price.toFixed(2), b.pages]),
  },
  {
    id: 2,
    title: 'Display all authors',
    purpose: 'List all registered authors with their academic qualification, institutional affiliation, and email.',
    conceptTag: 'Basic SELECT & Concatenation',
    sql: `SELECT author_id,
       first_name || ' ' || last_name AS author_name,
       qualification,
       affiliation,
       email
FROM AUTHOR
ORDER BY author_id;`,
    columns: ['AUTHOR_ID', 'AUTHOR_NAME', 'QUALIFICATION', 'AFFILIATION', 'EMAIL'],
    rows: AUTHORS.slice()
      .sort((a, b) => a.author_id - b.author_id)
      .map((a) => [a.author_id, `${a.first_name} ${a.last_name}`, a.qualification, a.affiliation, a.email]),
  },
  {
    id: 3,
    title: 'Find books written by a particular author',
    purpose: "Find all books written or co-authored by 'Dr. Rajesh Sharma' (author_id = 301) along with his authorship role and royalty share.",
    conceptTag: 'Multi-table JOIN + WHERE Filter',
    sql: `SELECT b.book_id,
       b.title,
       b.edition,
       ba.author_role,
       ba.royalty_share
FROM BOOK b
JOIN BOOK_AUTHOR ba ON b.book_id = ba.book_id
JOIN AUTHOR a ON ba.author_id = a.author_id
WHERE a.first_name = 'Dr. Rajesh'
  AND a.last_name = 'Sharma'
ORDER BY b.book_id;`,
    columns: ['BOOK_ID', 'TITLE', 'EDITION', 'AUTHOR_ROLE', 'ROYALTY_SHARE'],
    rows: BOOK_AUTHORS.filter((ba) => ba.author_id === 301)
      .sort((a, b) => a.book_id - b.book_id)
      .map((ba) => {
        const b = bookById.get(ba.book_id)!;
        return [b.book_id, b.title, b.edition, ba.author_role, ba.royalty_share.toFixed(2)];
      }),
  },
  {
    id: 4,
    title: 'Display authors and their specialized subjects',
    purpose: 'Show each author alongside their primary scientific subject specialization and department code.',
    conceptTag: 'JOIN (AUTHOR & SUBJECT)',
    sql: `SELECT a.author_id,
       a.first_name || ' ' || a.last_name AS author_name,
       s.subject_name,
       s.department_code
FROM AUTHOR a
JOIN SUBJECT s ON a.subject_id = s.subject_id
ORDER BY a.author_id;`,
    columns: ['AUTHOR_ID', 'AUTHOR_NAME', 'SUBJECT_NAME', 'DEPARTMENT_CODE'],
    rows: AUTHORS.slice()
      .sort((a, b) => a.author_id - b.author_id)
      .map((a) => {
        const s = subjectById.get(a.subject_id)!;
        return [a.author_id, `${a.first_name} ${a.last_name}`, s.subject_name, s.department_code];
      }),
  },
  {
    id: 5,
    title: 'Display books and their editors',
    purpose: 'List every book together with the assigned editor, editorial stage, and assignment date.',
    conceptTag: 'Many-to-Many JOIN',
    sql: `SELECT b.book_id,
       b.title,
       e.first_name || ' ' || e.last_name AS editor_name,
       be.editing_stage,
       TO_CHAR(be.assigned_date, 'YYYY-MM-DD') AS assigned_date
FROM BOOK b
JOIN BOOK_EDITOR be ON b.book_id = be.book_id
JOIN EDITOR e ON be.editor_id = e.editor_id
ORDER BY b.book_id, be.assigned_date;`,
    columns: ['BOOK_ID', 'TITLE', 'EDITOR_NAME', 'EDITING_STAGE', 'ASSIGNED_DATE'],
    rows: BOOK_EDITORS.slice()
      .sort((a, b) => a.book_id - b.book_id || a.assigned_date.localeCompare(b.assigned_date))
      .map((be) => {
        const b = bookById.get(be.book_id)!;
        const e = editorById.get(be.editor_id)!;
        return [b.book_id, b.title, `${e.first_name} ${e.last_name}`, be.editing_stage, be.assigned_date];
      }),
  },
  {
    id: 6,
    title: 'Find books published by a particular publisher',
    purpose: "Retrieve all books published by 'Apex Scientific Press' including ISBN, release date, and price.",
    conceptTag: 'JOIN + String Filter',
    sql: `SELECT b.book_id,
       b.isbn,
       b.title,
       TO_CHAR(b.publication_date, 'YYYY-MM-DD') AS pub_date,
       b.price
FROM BOOK b
JOIN PUBLISHER p ON b.publisher_id = p.publisher_id
WHERE p.publisher_name = 'Apex Scientific Press'
ORDER BY b.book_id;`,
    columns: ['BOOK_ID', 'ISBN', 'TITLE', 'PUB_DATE', 'PRICE'],
    rows: BOOKS.filter((b) => publisherById.get(b.publisher_id)?.publisher_name === 'Apex Scientific Press')
      .sort((a, b) => a.book_id - b.book_id)
      .map((b) => [b.book_id, b.isbn, b.title, b.publication_date, b.price.toFixed(2)]),
  },
  {
    id: 7,
    title: 'Count the total number of books',
    purpose: 'Compute the aggregate total count of books along with minimum, maximum, and average book price.',
    conceptTag: 'Aggregate Functions',
    sql: `SELECT COUNT(*) AS total_books,
       MIN(price) AS min_price,
       MAX(price) AS max_price,
       ROUND(AVG(price), 2) AS avg_price
FROM BOOK;`,
    columns: ['TOTAL_BOOKS', 'MIN_PRICE', 'MAX_PRICE', 'AVG_PRICE'],
    rows: [
      [
        BOOKS.length,
        Math.min(...BOOKS.map((b) => b.price)).toFixed(2),
        Math.max(...BOOKS.map((b) => b.price)).toFixed(2),
        (BOOKS.reduce((sum, b) => sum + b.price, 0) / BOOKS.length).toFixed(2),
      ],
    ],
  },
  {
    id: 8,
    title: 'Count books written by each author',
    purpose: 'Count how many books each author has written or co-authored using LEFT JOIN and GROUP BY.',
    conceptTag: 'LEFT JOIN + GROUP BY',
    sql: `SELECT a.author_id,
       a.first_name || ' ' || a.last_name AS author_name,
       COUNT(ba.book_id) AS books_written
FROM AUTHOR a
LEFT JOIN BOOK_AUTHOR ba ON a.author_id = ba.author_id
GROUP BY a.author_id, a.first_name, a.last_name
ORDER BY books_written DESC, a.author_id;`,
    columns: ['AUTHOR_ID', 'AUTHOR_NAME', 'BOOKS_WRITTEN'],
    rows: AUTHORS.map((a) => ({
      id: a.author_id,
      name: `${a.first_name} ${a.last_name}`,
      count: BOOK_AUTHORS.filter((ba) => ba.author_id === a.author_id).length,
    }))
      .sort((x, y) => y.count - x.count || x.id - y.id)
      .map((r) => [r.id, r.name, r.count]),
  },
  {
    id: 9,
    title: 'Display books published after a particular year',
    purpose: 'Display all scientific books published strictly after the year 2022 using Oracle EXTRACT(YEAR FROM ...).',
    conceptTag: 'Oracle Date Filtering',
    sql: `SELECT book_id,
       title,
       edition,
       TO_CHAR(publication_date, 'YYYY-MM-DD') AS pub_date,
       price
FROM BOOK
WHERE EXTRACT(YEAR FROM publication_date) > 2022
ORDER BY publication_date;`,
    columns: ['BOOK_ID', 'TITLE', 'EDITION', 'PUB_DATE', 'PRICE'],
    rows: BOOKS.filter((b) => Number(b.publication_date.slice(0, 4)) > 2022)
      .sort((a, b) => a.publication_date.localeCompare(b.publication_date))
      .map((b) => [b.book_id, b.title, b.edition, b.publication_date, b.price.toFixed(2)]),
  },
  {
    id: 10,
    title: 'Find books belonging to a particular subject',
    purpose: "Find all published books under the subject 'Database Systems' along with their publisher name.",
    conceptTag: 'Subject Filter + JOIN',
    sql: `SELECT b.book_id,
       b.title,
       s.subject_name,
       p.publisher_name,
       b.price
FROM BOOK b
JOIN SUBJECT s ON b.subject_id = s.subject_id
JOIN PUBLISHER p ON b.publisher_id = p.publisher_id
WHERE s.subject_name = 'Database Systems'
ORDER BY b.book_id;`,
    columns: ['BOOK_ID', 'TITLE', 'SUBJECT_NAME', 'PUBLISHER_NAME', 'PRICE'],
    rows: BOOKS.filter((b) => subjectById.get(b.subject_id)?.subject_name === 'Database Systems')
      .sort((a, b) => a.book_id - b.book_id)
      .map((b) => [
        b.book_id,
        b.title,
        subjectById.get(b.subject_id)!.subject_name,
        publisherById.get(b.publisher_id)!.publisher_name,
        b.price.toFixed(2),
      ]),
  },
  {
    id: 11,
    title: 'Display books with multiple authors',
    purpose: 'Identify collaborative books that have more than one contributing author in BOOK_AUTHOR.',
    conceptTag: 'GROUP BY + HAVING COUNT > 1',
    sql: `SELECT b.book_id,
       b.title,
       COUNT(ba.author_id) AS author_count
FROM BOOK b
JOIN BOOK_AUTHOR ba ON b.book_id = ba.book_id
GROUP BY b.book_id, b.title
HAVING COUNT(ba.author_id) > 1
ORDER BY b.book_id;`,
    columns: ['BOOK_ID', 'TITLE', 'AUTHOR_COUNT'],
    rows: BOOKS.map((b) => ({
      id: b.book_id,
      title: b.title,
      count: BOOK_AUTHORS.filter((ba) => ba.book_id === b.book_id).length,
    }))
      .filter((r) => r.count > 1)
      .sort((a, b) => a.id - b.id)
      .map((r) => [r.id, r.title, r.count]),
  },
  {
    id: 12,
    title: 'Display editors supervising multiple books',
    purpose: 'Find editors who are currently supervising more than one book across editorial stages.',
    conceptTag: 'GROUP BY + HAVING COUNT > 1',
    sql: `SELECT e.editor_id,
       e.first_name || ' ' || e.last_name AS editor_name,
       e.designation,
       COUNT(be.book_id) AS books_supervised
FROM EDITOR e
JOIN BOOK_EDITOR be ON e.editor_id = be.editor_id
GROUP BY e.editor_id, e.first_name, e.last_name, e.designation
HAVING COUNT(be.book_id) > 1
ORDER BY books_supervised DESC, e.editor_id;`,
    columns: ['EDITOR_ID', 'EDITOR_NAME', 'DESIGNATION', 'BOOKS_SUPERVISED'],
    rows: EDITORS.map((e) => ({
      id: e.editor_id,
      name: `${e.first_name} ${e.last_name}`,
      desig: e.designation,
      count: BOOK_EDITORS.filter((be) => be.editor_id === e.editor_id).length,
    }))
      .filter((r) => r.count > 1)
      .sort((a, b) => b.count - a.count || a.id - b.id)
      .map((r) => [r.id, r.name, r.desig, r.count]),
  },
  {
    id: 13,
    title: 'Complete book catalog using INNER JOIN',
    purpose: 'Demonstrate explicit INNER JOIN across BOOK, SUBJECT, and PUBLISHER to produce a unified catalog view.',
    conceptTag: 'INNER JOIN',
    sql: `SELECT b.book_id,
       b.title,
       s.subject_name,
       p.publisher_name,
       b.price
FROM BOOK b
INNER JOIN SUBJECT s ON b.subject_id = s.subject_id
INNER JOIN PUBLISHER p ON b.publisher_id = p.publisher_id
ORDER BY b.book_id;`,
    columns: ['BOOK_ID', 'TITLE', 'SUBJECT_NAME', 'PUBLISHER_NAME', 'PRICE'],
    rows: BOOKS.slice()
      .sort((a, b) => a.book_id - b.book_id)
      .map((b) => [
        b.book_id,
        b.title,
        subjectById.get(b.subject_id)!.subject_name,
        publisherById.get(b.publisher_id)!.publisher_name,
        b.price.toFixed(2),
      ]),
  },
  {
    id: 14,
    title: 'Subjects with multiple books using GROUP BY and HAVING',
    purpose: 'Group books by subject and filter for subjects having more than 1 published book, showing average price.',
    conceptTag: 'GROUP BY & HAVING',
    sql: `SELECT s.subject_name,
       COUNT(b.book_id) AS total_books,
       ROUND(AVG(b.price), 2) AS avg_price
FROM SUBJECT s
JOIN BOOK b ON s.subject_id = b.subject_id
GROUP BY s.subject_name
HAVING COUNT(b.book_id) > 1
ORDER BY total_books DESC, s.subject_name;`,
    columns: ['SUBJECT_NAME', 'TOTAL_BOOKS', 'AVG_PRICE'],
    rows: SUBJECTS.map((s) => {
      const subBooks = BOOKS.filter((b) => b.subject_id === s.subject_id);
      return {
        name: s.subject_name,
        count: subBooks.length,
        avg: subBooks.length > 0 ? subBooks.reduce((acc, b) => acc + b.price, 0) / subBooks.length : 0,
      };
    })
      .filter((r) => r.count > 1)
      .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
      .map((r) => [r.name, r.count, r.avg.toFixed(2)]),
  },
  {
    id: 15,
    title: 'Sort books by publication date and price using ORDER BY',
    purpose: 'Display all books ordered by newest publication year/date first, breaking ties by highest price.',
    conceptTag: 'ORDER BY (Multi-Column)',
    sql: `SELECT book_id,
       title,
       TO_CHAR(publication_date, 'YYYY-MM-DD') AS pub_date,
       price,
       pages
FROM BOOK
ORDER BY publication_date DESC, price DESC;`,
    columns: ['BOOK_ID', 'TITLE', 'PUB_DATE', 'PRICE', 'PAGES'],
    rows: BOOKS.slice()
      .sort((a, b) => b.publication_date.localeCompare(a.publication_date) || b.price - a.price)
      .map((b) => [b.book_id, b.title, b.publication_date, b.price.toFixed(2), b.pages]),
  },
];

// ============================================================================
// SECTION 16: 20 VIVA QUESTIONS AND SHORT ANSWERS
// ============================================================================

export const VIVA_QUESTIONS: VivaQuestion[] = [
  {
    id: 1,
    topic: 'DBMS Fundamentals',
    question: 'What is a Relational Database Management System (RDBMS), and why was Oracle SQL used in this project?',
    answer: 'An RDBMS stores data in structured tables (relations) linked by keys. Oracle SQL provides strong ACID compliance, strict constraint enforcement (PK, FK, CHECK, UNIQUE), and enterprise-grade query optimization.',
  },
  {
    id: 2,
    topic: 'Keys',
    question: 'What is the difference between a Primary Key and a Foreign Key in our Book Publishing database?',
    answer: 'A Primary Key uniquely identifies each row in a table (e.g., book_id in BOOK) and cannot be NULL. A Foreign Key links one table to another by referencing a Primary Key (e.g., publisher_id in BOOK references PUBLISHER).',
  },
  {
    id: 3,
    topic: 'Keys',
    question: 'What is a Composite Primary Key? Give an example from this schema.',
    answer: 'A Composite Primary Key combines two or more columns to uniquely identify a row. In BOOK_AUTHOR, (book_id, author_id) together form the Primary Key so an author cannot be linked twice to the same book.',
  },
  {
    id: 4,
    topic: 'ER Modeling',
    question: 'Why did we introduce junction tables BOOK_AUTHOR and BOOK_EDITOR instead of putting author_id inside BOOK?',
    answer: 'Because one book can have multiple authors and one author can write multiple books (M:N relationship). Placing author_id in BOOK would cause repeating groups and violate 1NF. Junction tables resolve M:N into two 1:M relationships.',
  },
  {
    id: 5,
    topic: 'Cardinalities',
    question: 'What is the cardinality between PUBLISHER and BOOK, and why?',
    answer: 'It is 1:M (One-to-Many). One publisher can publish many scientific books, while each book edition in our catalog is published by exactly one publisher.',
  },
  {
    id: 6,
    topic: 'Normalization',
    question: 'What is Normalization, and what problems does it solve?',
    answer: 'Normalization is the systematic process of organizing tables to eliminate data redundancy and prevent Insertion, Update, and Deletion anomalies.',
  },
  {
    id: 7,
    topic: 'Normalization',
    question: 'How does First Normal Form (1NF) apply to the Book Publishing Company?',
    answer: '1NF requires every column to hold atomic (indivisible) values with no repeating groups. Splitting comma-separated author names or multiple ISBNs into separate rows/tables satisfies 1NF.',
  },
  {
    id: 8,
    topic: 'Normalization',
    question: 'What is Partial Dependency, and how did Second Normal Form (2NF) remove it?',
    answer: 'Partial dependency occurs when a non-key attribute depends on only part of a composite primary key. In 2NF, attributes like book_title (which depend only on book_id) and author_name (depending only on author_id) are moved to separate BOOK and AUTHOR tables.',
  },
  {
    id: 9,
    topic: 'Normalization',
    question: 'What is Transitive Dependency, and how did Third Normal Form (3NF) eliminate it?',
    answer: 'Transitive dependency occurs when a non-key attribute depends on another non-key attribute (e.g., book_id -> publisher_id -> publisher_city). Moving publisher_city to the PUBLISHER table achieves 3NF.',
  },
  {
    id: 10,
    topic: 'Oracle Data Types',
    question: 'What is the difference between CHAR and VARCHAR2 in Oracle SQL?',
    answer: 'CHAR is fixed-length and pads unused space with blanks, whereas VARCHAR2 is variable-length and stores only the exact number of characters entered, saving storage.',
  },
  {
    id: 11,
    topic: 'Oracle Data Types',
    question: 'Why did we define price as NUMBER(8,2) instead of INTEGER?',
    answer: 'NUMBER(8,2) stores up to 8 total significant digits with 2 digits after the decimal point (e.g., 1050.00), which is ideal for exact currency values without floating-point rounding errors.',
  },
  {
    id: 12,
    topic: 'Constraints',
    question: 'What is the difference between UNIQUE and PRIMARY KEY constraints in Oracle?',
    answer: 'Both enforce uniqueness, but a table can have only one PRIMARY KEY (which implicitly forbids NULLs), whereas it can have multiple UNIQUE constraints (which allow NULLs unless combined with NOT NULL).',
  },
  {
    id: 13,
    topic: 'Constraints',
    question: 'What does ON DELETE CASCADE do in BOOK_AUTHOR and BOOK_EDITOR?',
    answer: 'If a parent record in BOOK, AUTHOR, or EDITOR is deleted, Oracle automatically deletes the dependent rows in the junction tables so no orphan foreign key references remain.',
  },
  {
    id: 14,
    topic: 'Referential Integrity',
    question: 'Why must parent tables (PUBLISHER, SUBJECT, AUTHOR, EDITOR) be created and populated before BOOK?',
    answer: 'Because of Referential Integrity: a FOREIGN KEY cannot reference a table that does not exist yet, and an INSERT into BOOK will fail if its subject_id or publisher_id does not already exist in the parent tables.',
  },
  {
    id: 15,
    topic: 'SQL Clauses',
    question: 'What is the difference between WHERE and HAVING clauses in SQL?',
    answer: 'WHERE filters individual rows BEFORE grouping occurs and cannot use aggregate functions. HAVING filters grouped results AFTER GROUP BY and is used with aggregates like COUNT(*) or AVG(price).',
  },
  {
    id: 16,
    topic: 'SQL Joins',
    question: 'What is the difference between INNER JOIN and LEFT JOIN (used in Query 8 vs Query 13)?',
    answer: 'INNER JOIN returns only rows with matching keys in both tables. LEFT JOIN returns all rows from the left table (e.g., all authors) even if they have 0 matching rows in the right table.',
  },
  {
    id: 17,
    topic: 'Oracle Date Handling',
    question: 'Why do we use TO_DATE() and TO_CHAR() with DATE columns in Oracle SQL?',
    answer: "TO_DATE('2022-07-15', 'YYYY-MM-DD') converts a string literal safely into an Oracle DATE regardless of session NLS_DATE_FORMAT, while TO_CHAR formats a DATE back into a readable string for display.",
  },
  {
    id: 18,
    topic: 'Oracle Syntax',
    question: 'Why do our Oracle SQL queries avoid the AS keyword for table aliases (e.g., FROM BOOK b)?',
    answer: 'In standard Oracle SQL (11g/12c/19c/21c), the AS keyword is allowed for column aliases (e.g., COUNT(*) AS total_books) but causes a syntax error (ORA-00933) if used before a table alias.',
  },
  {
    id: 19,
    topic: 'Data Integrity',
    question: 'How does the CHECK constraint protect data quality in our schema?',
    answer: 'CHECK constraints enforce domain rules at the database level—for example, ensuring price > 0, pages > 0, edition >= 1, and royalty_share is strictly between 0 and 100.',
  },
  {
    id: 20,
    topic: 'DDL vs DML',
    question: 'What is the difference between DDL and DML commands used in this project?',
    answer: 'DDL (Data Definition Language) defines database structure using CREATE TABLE and auto-commits in Oracle. DML (Data Manipulation Language) manages records using INSERT and SELECT, requiring COMMIT to persist changes.',
  },
];

export const FULL_ORACLE_SCRIPT = `${ORACLE_DDL_SQL}\n\n${ORACLE_DML_SQL}\n\n-- ============================================================================\n-- 15 VERIFICATION & ANALYTICAL QUERIES\n-- ============================================================================\n\n${SQL_QUERIES.map(
  (q) => `-- Query ${q.id}: ${q.title}\n${q.sql}`
).join('\n\n')}`;

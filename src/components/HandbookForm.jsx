import { useState, useRef, useEffect } from 'react'
import './HandbookForm.css'

/* ── Constants ── */
const PO_PSO_OPTIONS = [
  'PO1','PO2','PO3','PO4','PO5','PO6',
  'PO7','PO8','PO9','PO10','PO11','PO12',
  'PSO1','PSO2'
]

const BTL_OPTIONS = [
  { value: 1, label: '1 - Remember' },
  { value: 2, label: '2 - Understand' },
  { value: 3, label: '3 - Apply' },
  { value: 4, label: '4 - Analyze' },
  { value: 5, label: '5 - Evaluate' },
]

/* ── MultiSelect Dropdown ── */
function MultiSelect({ options, selected, onChange, openUpward }) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const toggle = (opt) => {
    onChange(selected.includes(opt) ? selected.filter(s => s !== opt) : [...selected, opt])
  }

  return (
    <div className="ms-wrap" ref={ref}>
      <button type="button" className="ms-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span className="ms-value">{selected.length > 0 ? selected.join(', ') : 'Select PO/PSO'}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points={isOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
        </svg>
      </button>
      {isOpen && (
        <div className={`ms-dropdown ${openUpward ? 'ms-dropdown-up' : ''}`}>
          <div className="ms-group-label">Program Outcomes</div>
          {options.filter(o => o.startsWith('PO')).map(opt => (
            <label key={opt} className="ms-option">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
              <span>{opt}</span>
            </label>
          ))}
          <div className="ms-group-label">Program Specific Outcomes</div>
          {options.filter(o => o.startsWith('PSO')).map(opt => (
            <label key={opt} className="ms-option">
              <input type="checkbox" checked={selected.includes(opt)} onChange={() => toggle(opt)} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── SVG Icons ── */
const Icons = {
  course: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="16" y2="7" /><line x1="9" y1="11" x2="14" y2="11" />
    </svg>
  ),
  outcomes: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  syllabus: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      <line x1="8" y1="13" x2="16" y2="13" /><line x1="8" y1="17" x2="13" y2="17" />
    </svg>
  ),
  books: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  plus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  trash: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  eye: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  printer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 6 2 18 2 18 9" /><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" />
    </svg>
  ),
  back: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
    </svg>
  ),
  clear: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
}

/* ══════════════════════════════════════════════════════ */
/*  Main HandbookForm Component                          */
/* ══════════════════════════════════════════════════════ */
function HandbookForm() {
  /* ── State ── */
  const PROGRAM = 'Y25: B.Tech. - Computer Science and Engineering'

  const [course, setCourse] = useState({
    code: '',
    title: '',
    acronym: '',
    mode: 'R',
    L: 3, T: 0, P: 0, S: 0, CR: 4,
  })

  const [outcomes, setOutcomes] = useState([
    { description: '', btl: 3, poPso: [] },
    { description: '', btl: 2, poPso: [] },
    { description: '', btl: 3, poPso: [] },
    { description: '', btl: 3, poPso: [] },
    { description: '', btl: 3, poPso: [] },
  ])

  const [syllabus, setSyllabus] = useState('')
  const [referenceBooks, setReferenceBooks] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  /* ── Handlers ── */
  const updateCourse = (field, value) => setCourse(prev => ({ ...prev, [field]: value }))

  const addOutcome = () => {
    setOutcomes(prev => [...prev, { description: '', btl: 3, poPso: [] }])
  }

  const removeOutcome = (index) => {
    if (outcomes.length <= 1) return
    setOutcomes(prev => prev.filter((_, i) => i !== index))
  }

  const updateOutcome = (index, field, value) => {
    setOutcomes(prev => prev.map((o, i) => i === index ? { ...o, [field]: value } : o))
  }

  const handlePrint = () => {
    setShowPreview(true)
    setTimeout(() => window.print(), 400)
  }

  const clearForm = () => {
    if (!window.confirm('Are you sure you want to clear the entire form?')) return
    setCourse({ code: '', title: '', acronym: '', mode: 'R', L: 3, T: 0, P: 0, S: 0, CR: 4 })
    setOutcomes([
      { description: '', btl: 3, poPso: [] },
      { description: '', btl: 2, poPso: [] },
      { description: '', btl: 3, poPso: [] },
      { description: '', btl: 3, poPso: [] },
      { description: '', btl: 3, poPso: [] },
    ])
    setSyllabus('')
    setReferenceBooks('')
  }

  /* ── Derived ── */
  const syllabusUnits = syllabus.split('\n\n').filter(s => s.trim())
  const booksList = referenceBooks.split('\n').filter(s => s.trim())

  /* ══════════════════════════ */
  /*  FORM VIEW                */
  /* ══════════════════════════ */
  if (!showPreview) {
    return (
      <div className="handbook-page">
        <main className="form-container">

          {/* ─── Section 1: Course Details ─── */}
          <section className="form-card" id="course-details-card">
            <div className="card-header">
              <div className="card-icon">{Icons.course}</div>
              <div>
                <h2>Course Details</h2>
                <p className="card-subtitle">Enter the course information and structure</p>
              </div>
            </div>
            <div className="card-body">
              {/* Row 1 */}
              <div className="form-group">
                <label>Program</label>
                <div className="program-fixed">{PROGRAM}</div>
              </div>

              {/* Row 2 */}
              <div className="form-row-2">
                <div className="form-group" style={{ maxWidth: '200px' }}>
                  <label htmlFor="courseCode">Course Code</label>
                  <input id="courseCode" type="text" placeholder="e.g. 25CPD3101" value={course.code} onChange={e => updateCourse('code', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="courseTitle">Course Title</label>
                  <input id="courseTitle" type="text" placeholder="e.g. FUNDAMENTALS OF MOBILE APPLICATION DEVELOPMENT" value={course.title} onChange={e => updateCourse('title', e.target.value)} />
                </div>
              </div>

              {/* Row 3 */}
              <div className="form-row-3">
                <div className="form-group">
                  <label htmlFor="acronym">Acronym</label>
                  <input id="acronym" type="text" placeholder="e.g. FMAD" value={course.acronym} onChange={e => updateCourse('acronym', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="mode">Mode</label>
                  <select id="mode" value={course.mode} onChange={e => updateCourse('mode', e.target.value)}>
                    <option value="R">R (Regular)</option>
                    <option value="E">E (Elective)</option>
                    <option value="A">A (Advanced)</option>
                  </select>
                </div>
              </div>

              {/* Structure L T P S CR */}
              <div className="structure-label">Structure (L T P S CR)</div>
              <div className="structure-grid">
                {['L','T','P','S','CR'].map(key => (
                  <div className="struct-item" key={key}>
                    <label htmlFor={`struct-${key}`}>{key}</label>
                    <input id={`struct-${key}`} type="number" min="0" max="20" value={course[key]} onChange={e => updateCourse(key, e.target.value === '' ? '' : parseInt(e.target.value))} />
                  </div>
                ))}
              </div>


            </div>
          </section>

          {/* ─── Section 2: Course Outcomes ─── */}
          <section className="form-card" id="course-outcomes-card">
            <div className="card-header">
              <div className="card-icon">{Icons.outcomes}</div>
              <div>
                <h2>Course Outcomes</h2>
                <p className="card-subtitle">Define learning outcomes with BTL levels and PO/PSO mapping</p>
              </div>
            </div>
            <div className="card-body">
              <div className="co-table-wrap">
                <table className="co-table" id="co-table">
                  <thead>
                    <tr>
                      <th style={{ width: '70px' }}>CO#</th>
                      <th>CO Description</th>
                      <th style={{ width: '160px' }}>BTL</th>
                      <th style={{ width: '200px' }}>PO / PSO</th>
                      <th style={{ width: '50px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcomes.map((o, i) => (
                      <tr key={i}>
                        <td className="co-num">CO{i + 1}</td>
                        <td>
                          <input
                            type="text"
                            className="co-desc-input"
                            placeholder="Enter CO description..."
                            value={o.description}
                            onChange={e => updateOutcome(i, 'description', e.target.value)}
                          />
                        </td>
                        <td>
                          <select className="btl-select" value={o.btl} onChange={e => updateOutcome(i, 'btl', parseInt(e.target.value))}>
                            {BTL_OPTIONS.map(b => (
                              <option key={b.value} value={b.value}>{b.label}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <MultiSelect
                            options={PO_PSO_OPTIONS}
                            selected={o.poPso}
                            onChange={val => updateOutcome(i, 'poPso', val)}
                            openUpward={i >= outcomes.length - 2 && outcomes.length > 2}
                          />
                        </td>
                        <td>
                          <button type="button" className="btn-icon btn-remove" onClick={() => removeOutcome(i)} title="Remove CO" disabled={outcomes.length <= 1}>
                            {Icons.trash}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button type="button" className="btn-add-co" onClick={addOutcome}>
                {Icons.plus}
                <span>Add Course Outcome</span>
              </button>
            </div>
          </section>

          {/* ─── Section 3: Syllabus ─── */}
          <section className="form-card" id="syllabus-card">
            <div className="card-header">
              <div className="card-icon">{Icons.syllabus}</div>
              <div>
                <h2>Syllabus</h2>
                <p className="card-subtitle">Separate each unit/module with a blank line</p>
              </div>
            </div>
            <div className="card-body">
              <textarea
                id="syllabus-input"
                className="large-textarea"
                rows="12"
                placeholder="Enter syllabus content here...&#10;&#10;Separate each unit/module with a blank line.&#10;&#10;Example:&#10;Unit 1: Introduction to Kotlin...&#10;&#10;Unit 2: Android Architecture..."
                value={syllabus}
                onChange={e => setSyllabus(e.target.value)}
              />
            </div>
          </section>

          {/* ─── Section 4: Reference Books ─── */}
          <section className="form-card" id="reference-books-card">
            <div className="card-header">
              <div className="card-icon">{Icons.books}</div>
              <div>
                <h2>Reference Books</h2>
                <p className="card-subtitle">One book per line (Title, Author, Year, Publisher)</p>
              </div>
            </div>
            <div className="card-body">
              <textarea
                id="refbooks-input"
                className="large-textarea"
                rows="8"
                placeholder="Enter one book per line...&#10;&#10;Example:&#10;Android Programming with Kotlin for Beginners, John Horton, 2020, Packt Publishing.&#10;Kotlin for Android App Development, Erik Hellman, 2019, Addison-Wesley."
                value={referenceBooks}
                onChange={e => setReferenceBooks(e.target.value)}
              />
            </div>
          </section>

          {/* ─── Actions ─── */}
          <div className="form-actions">
            <button type="button" className="btn-clear" onClick={clearForm}>
              {Icons.clear}
              <span>Clear Form</span>
            </button>
            <button type="button" className="btn-preview" onClick={() => setShowPreview(true)}>
              {Icons.eye}
              <span>Preview</span>
            </button>
            <button type="button" className="btn-print" onClick={handlePrint}>
              {Icons.printer}
              <span>Print / Download PDF</span>
            </button>
          </div>

        </main>
      </div>
    )
  }

  /* ══════════════════════════ */
  /*  PREVIEW VIEW             */
  /* ══════════════════════════ */
  return (
    <div className="handbook-page">
      {/* Toolbar (hidden when printing) */}
      <div className="preview-toolbar no-print">
        <button className="btn-back" onClick={() => setShowPreview(false)}>
          {Icons.back}
          <span>Back to Form</span>
        </button>
        <button className="btn-print" onClick={() => window.print()}>
          {Icons.printer}
          <span>Print / Download PDF</span>
        </button>
      </div>

      {/* Print Document */}
      <div className="print-document" id="print-area">

        {/* Header line */}
        <div className="pd-header-row">
          <span className="pd-program">{PROGRAM}</span>
        </div>
        <hr className="pd-divider" />

        {/* Title */}
        <h1 className="pd-title">
          {course.code && `${course.code} - `}{course.title || 'COURSE TITLE'}{course.mode ? ` (${course.mode})` : ''}
        </h1>

        {/* Course Details Table */}
        <table className="pd-course-table">
          <thead>
            <tr>
              <th>CourseCode</th>
              <th>Course Title</th>
              <th>Acronym</th>
              <th>Mode</th>
              <th>L</th>
              <th>T</th>
              <th>P</th>
              <th>S</th>
              <th>CR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{course.code}</td>
              <td>{course.title}</td>
              <td>{course.acronym}</td>
              <td>{course.mode}</td>
              <td>{course.L}</td>
              <td>{course.T}</td>
              <td>{course.P}</td>
              <td>{course.S}</td>
              <td>{course.CR}</td>
            </tr>
          </tbody>
        </table>

        {/* Course Outcomes */}
        <h2 className="pd-section-title">Course Outcomes</h2>
        <table className="pd-co-table">
          <thead>
            <tr>
              <th style={{ width: '50px' }}>CO#</th>
              <th>CO Description</th>
              <th style={{ width: '50px' }}>BTL</th>
              <th style={{ width: '100px' }}>PO/PSO</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.map((o, i) => (
              <tr key={i}>
                <td>CO{i + 1}</td>
                <td>{o.description}</td>
                <td style={{ textAlign: 'center' }}>{o.btl}</td>
                <td>{o.poPso.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Syllabus */}
        <h2 className="pd-section-title">Syllabus</h2>
        <div className="pd-syllabus">
          {syllabusUnits.length > 0
            ? syllabusUnits.map((unit, i) => <p key={i}>{unit}</p>)
            : <p className="pd-empty">No syllabus entered.</p>
          }
        </div>

        {/* Reference Books */}
        <h2 className="pd-section-title">Reference Books</h2>
        <div className="pd-books">
          {booksList.length > 0 ? (
            <ol>
              {booksList.map((book, i) => <li key={i}>{book}</li>)}
            </ol>
          ) : (
            <p className="pd-empty">No reference books entered.</p>
          )}
        </div>



      </div>
    </div>
  )
}

export default HandbookForm

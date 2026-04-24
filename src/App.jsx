import { useState, useEffect } from 'react';
import './styles/global.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getSortedStudents(studentsMap) {
  return [...studentsMap.values()].sort((a, b) => b.gpa - a.gpa);
}

function getUniqueCourses(studentsMap) {
  const courseSet = [...studentsMap.values()].reduce((acc, student) => {
    [...student.enrolledCourses].forEach(course => acc.add(course));
    return acc;
  }, new Set());
  return [...courseSet].sort();
}

function filterByCourse(studentsMap, course) {
  if (!course) return getSortedStudents(studentsMap);
  return getSortedStudents(studentsMap).filter(student =>
    student.enrolledCourses.has(course)
  );
}

function computeStats(studentsMap) {
  const students = [...studentsMap.values()];
  if (students.length === 0)
    return { total: 0, highestGpa: 0, averageGpa: 0, uniqueCoursesCount: 0 };

  const { highestGpa, totalGpa } = students.reduce(
    (acc, s) => ({
      highestGpa: Math.max(acc.highestGpa, s.gpa),
      totalGpa: acc.totalGpa + s.gpa,
    }),
    { highestGpa: 0, totalGpa: 0 }
  );

  return {
    total: students.length,
    highestGpa: highestGpa.toFixed(2),
    averageGpa: (totalGpa / students.length).toFixed(2),
    uniqueCoursesCount: getUniqueCourses(studentsMap).length,
  };
}

function getNextId(studentsMap) {
  if (studentsMap.size === 0) return 1;
  return Math.max(...studentsMap.keys()) + 1;
}

// ─── Default Data ─────────────────────────────────────────────────────────────

function getDefaultStudents() {
  return new Map([
    [1, { id: 1, name: 'peter parker', enrolledCourses: new Set(['Data Structures', 'Algorithms', 'Machine Learning']), gpa: 3.92 }],
    [2, { id: 2, name: 'hermione granger', enrolledCourses: new Set(['Calculus II', 'Data Structures', 'Linear Algebra']), gpa: 3.74 }],
    [3, { id: 3, name: 'osamu dazai', enrolledCourses: new Set(['Machine Learning', 'Statistics', 'Python Programming']), gpa: 3.88 }],
  ]);
}

const STORAGE_KEY = 'course_dashboard_students';

function loadStudentsFromStorage() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return getDefaultStudents();
  try {
    const parsed = JSON.parse(saved);
    return new Map(
      parsed.map(s => [s.id, { ...s, enrolledCourses: new Set(s.enrolledCourses) }])
    );
  } catch {
    return getDefaultStudents();
  }
}

// ─── useStudents Hook ─────────────────────────────────────────────────────────

function useStudents() {
  const [studentsMap, setStudentsMap] = useState(() => loadStudentsFromStorage());
  const [filterCourse, setFilterCourse] = useState('');

  useEffect(() => {
    const arrayData = Array.from(studentsMap.values()).map(s => ({
      ...s,
      enrolledCourses: Array.from(s.enrolledCourses),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayData));
  }, [studentsMap]);

  const addStudent = ({ name, gpa, coursesRaw }) => {
    const id = getNextId(studentsMap);
    const coursesArray = coursesRaw.split(',').map(c => c.trim()).filter(c => c.length > 0);
    const student = { id, name: name.trim(), gpa: parseFloat(gpa), enrolledCourses: new Set(coursesArray) };
    setStudentsMap(prev => new Map([...prev, [id, student]]));
  };

  const removeStudent = id => {
    setStudentsMap(prev => {
      const next = new Map([...prev]);
      next.delete(id);
      return next;
    });
  };

  return {
    studentsMap,
    displayedStudents: filterByCourse(studentsMap, filterCourse),
    uniqueCourses: getUniqueCourses(studentsMap),
    stats: computeStats(studentsMap),
    filterCourse,
    setFilterCourse,
    addStudent,
    removeStudent,
  };
}

// ─── Header ───────────────────────────────────────────────────────────────────

function Header() {
  return (
    <header className="hero-section">
      <div className="hero-glow" />
      <p className="hero-eyebrow">Academic Management System</p>
      <h1 className="hero-title">Course Enrollment<br />Dashboard</h1>
      <p className="hero-subtitle">Manage students, track performance, and explore enrollment data</p>
    </header>
  );
}

// ─── StudentForm ──────────────────────────────────────────────────────────────

function StudentForm({ onAdd }) {
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState('');
  const [coursesRaw, setCoursesRaw] = useState('');
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = 'Name is required';
    const gpaNum = parseFloat(gpa);
    if (!gpa) e.gpa = 'GPA is required';
    else if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4) e.gpa = 'GPA must be between 0.0 and 4.0';
    if (!coursesRaw.trim()) e.courses = 'At least one course is required';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onAdd({ name, gpa, coursesRaw });
    setName(''); setGpa(''); setCoursesRaw(''); setErrors({});
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2200);
  };

  return (
    <div className="glass-card form-section">
      {showToast && (
        <div style={{ marginBottom: '1rem', padding: '0.8rem 1rem', borderRadius: '14px', background: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,154,134,0.35)', color: '#b45a3f', fontSize: '0.92rem', letterSpacing: '0.04em' }}>
          Student enrolled successfully
        </div>
      )}
      <p className="section-label">Enrollment</p>
      <h2 className="section-title">Add New Student</h2>
      <div className="divider" />

      <div className="form-group">
        <label className="form-label">Full Name</label>
        <input className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Jordan Lee" />
        {errors.name && <p className="form-error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">GPA (0.0 – 4.0)</label>
        <input className="form-input" type="number" step="0.01" min="0" max="4" value={gpa} onChange={e => setGpa(e.target.value)} placeholder="e.g. 3.75" />
        {errors.gpa && <p className="form-error">{errors.gpa}</p>}
      </div>

      <div className="form-group">
        <label className="form-label">Courses (comma separated)</label>
        <input className="form-input" value={coursesRaw} onChange={e => setCoursesRaw(e.target.value)} placeholder="e.g. Calculus, Physics, CS101" />
        {errors.courses && <p className="form-error">{errors.courses}</p>}
      </div>

      <button className="btn-primary" onClick={handleSubmit}>Enroll Student</button>
    </div>
  );
}

// ─── CourseFilter ─────────────────────────────────────────────────────────────

function CourseFilter({ courses, filterCourse, setFilterCourse, filteredCount, totalCount }) {
  return (
    <div className="glass-card filter-section">
      <p className="section-label">Filter</p>
      <h2 className="section-title">By Course</h2>
      <div className="divider" />
      <select className="filter-select" value={filterCourse} onChange={e => setFilterCourse(e.target.value)}>
        <option value="">All Students</option>
        {courses.map(course => <option key={course} value={course}>{course}</option>)}
      </select>
      <p className="filter-count">
        {filterCourse
          ? `${filteredCount} of ${totalCount} student${totalCount !== 1 ? 's' : ''} enrolled`
          : `Showing all ${totalCount} student${totalCount !== 1 ? 's' : ''}`}
      </p>
    </div>
  );
}

// ─── UniqueCourses ────────────────────────────────────────────────────────────

function UniqueCourses({ courses }) {
  return (
    <div className="glass-card courses-section">
      <p className="section-label">Catalogue</p>
      <h2 className="section-title">All Unique Courses</h2>
      <div className="divider" />
      {courses.length === 0
        ? <p className="empty-courses">No courses yet. Add students to populate.</p>
        : <div className="courses-chips">{courses.map(c => <span key={c} className="course-chip">{c}</span>)}</div>
      }
    </div>
  );
}

// ─── StatsPanel ───────────────────────────────────────────────────────────────

function StatsPanel({ stats }) {
  const items = [
    { value: stats.total, label: 'Total Students' },
    { value: stats.highestGpa, label: 'Highest GPA' },
    { value: stats.averageGpa, label: 'Average GPA' },
    { value: stats.uniqueCoursesCount, label: 'Unique Courses' },
  ];
  return (
    <div className="glass-card stats-section">
      <p className="section-label">Overview</p>
      <h2 className="section-title">Live Statistics</h2>
      <div className="divider" />
      <div className="stats-grid">
        {items.map(item => (
          <div key={item.label} className="stat-card">
            <div className="stat-value">{item.value}</div>
            <div className="stat-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── StudentCard ──────────────────────────────────────────────────────────────

function StudentCard({ student, onRemove }) {
  const courses = [...student.enrolledCourses];
  const handleDelete = () => {
    if (window.confirm(`Remove ${student.name} from the dashboard?`)) onRemove(student.id);
  };
  return (
    <div className="student-card">
      <div className="student-header">
        <div>
          <div className="student-name">{student.name}</div>
          <div className="student-id">ID #{String(student.id).padStart(4, '0')}</div>
        </div>
        <div className="gpa-badge">{student.gpa.toFixed(2)}</div>
      </div>
      <div className="student-courses">
        {courses.map(c => <span key={c} className="student-course-chip">{c}</span>)}
      </div>
      <button className="btn-remove" onClick={handleDelete}>Remove Student</button>
    </div>
  );
}

// ─── StudentList ──────────────────────────────────────────────────────────────

function StudentList({ students, onRemove, filterCourse }) {
  return (
    <div className="glass-card students-section">
      <p className="section-label">{filterCourse ? `Filtered · ${filterCourse}` : 'Roster · Sorted by GPA'}</p>
      <h2 className="section-title">{filterCourse ? `Students in ${filterCourse}` : 'All Students'}</h2>
      <div className="divider" />
      {students.length === 0 ? (
        <div style={{ padding: '2rem', borderRadius: '18px', background: 'rgba(255,255,255,0.28)', border: '1px solid rgba(255,154,134,0.22)', color: '#9d6a58', lineHeight: '1.7' }}>
          {filterCourse
            ? `No students are currently enrolled in ${filterCourse}.`
            : 'No students available yet. Add a new student using the enrollment form.'}
        </div>
      ) : (
        <div className="students-grid">
          {students.map(s => <StudentCard key={s.id} student={s} onRemove={onRemove} />)}
        </div>
      )}
    </div>
  );
}

// ─── ComplexityPanel ──────────────────────────────────────────────────────────

/**
 * Time Complexity of filterByCourse:
 *   O(n) — iterates once through all n students,
 *   checking Set.has() which is O(1) per student.
 *   Preceded by getSortedStudents which is O(n log n),
 *   so the combined operation is O(n log n).
 */
function ComplexityPanel() {
  const complexities = [
    { op: 'Filter by Course', value: 'O(n)', desc: 'Iterates once through all n students checking Set membership (.has) in O(1). Total: linear in students.' },
    { op: 'Sort by GPA', value: 'O(n log n)', desc: 'Uses Array.sort() — a comparison-based sort (Timsort). Must compare all n students through log n passes.' },
    { op: 'Unique Course Extraction', value: 'O(n × c)', desc: 'Iterates n students and c courses each. Reduce builds a Set with O(1) insertions. Total proportional to all course entries.' },
  ];
  return (
    <div className="glass-card complexity-section">
      <p className="section-label">Algorithm Analysis</p>
      <h2 className="section-title">Time Complexity</h2>
      <div className="divider" />
      <div className="complexity-grid">
        {complexities.map(item => (
          <div key={item.op} className="complexity-item">
            <div className="complexity-op">{item.op}</div>
            <div className="complexity-value">{item.value}</div>
            <div className="complexity-desc">{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { studentsMap, displayedStudents, uniqueCourses, stats, filterCourse, setFilterCourse, addStudent, removeStudent } = useStudents();

  return (
    <div className="dashboard-wrapper">
      <Header />
      <div className="main-grid">
        <aside className="left-column">
          <StudentForm onAdd={addStudent} />
          <CourseFilter
            courses={uniqueCourses}
            filterCourse={filterCourse}
            setFilterCourse={setFilterCourse}
            filteredCount={displayedStudents.length}
            totalCount={studentsMap.size}
          />
          <UniqueCourses courses={uniqueCourses} />
        </aside>
        <main className="right-column">
          <StatsPanel stats={stats} />
          <StudentList students={displayedStudents} onRemove={removeStudent} filterCourse={filterCourse} />
        </main>
      </div>
      <ComplexityPanel />
    </div>
  );
}

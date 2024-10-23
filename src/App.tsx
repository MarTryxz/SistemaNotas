import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import GradesList from './components/GradesList';
import GradeEditor from './components/GradeEditor';
import { Grade, Course } from './types';
import { LogOut, GraduationCap } from 'lucide-react';

const DEMO_COURSES: Course[] = [
  { id: '1', name: 'Matematicas 101', teacherId: '2', semester: 'Fall', year: 2024 },
  { id: '2', name: 'Fisica 101', teacherId: '2', semester: 'Fall', year: 2024 },
  { id: '3', name: 'Ciencia computacional 101', teacherId: '2', semester: 'Fall', year: 2024 },
];

const DEMO_GRADES: Grade[] = [
  {
    id: '1',
    studentId: '3',
    courseId: '1',
    score: 85,
    feedback: 'Buen desempeño con derivadas!',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function Dashboard() {
  const { user, logout } = useAuth();
  const [grades, setGrades] = React.useState<Grade[]>(() => {
    const stored = localStorage.getItem('grades');
    return stored ? JSON.parse(stored) : DEMO_GRADES;
  });
  const [editingGrade, setEditingGrade] = React.useState<Grade | null>(null);
  const [isEditorOpen, setIsEditorOpen] = React.useState(false);

  React.useEffect(() => {
    localStorage.setItem('grades', JSON.stringify(grades));
  }, [grades]);

  const visibleGrades = grades.filter(grade => {
    if (user?.role === 'admin') return true;
    if (user?.role === 'teacher') return true;
    return grade.studentId === user?.id;
  });

  const handleSaveGrade = (gradeData: Partial<Grade>) => {
    if (editingGrade) {
      setGrades(grades.map(g => 
        g.id === editingGrade.id 
          ? { ...editingGrade, ...gradeData, updatedAt: new Date().toISOString() } 
          : g
      ));
    } else {
      const newGrade: Grade = {
        id: Date.now().toString(),
        studentId: gradeData.studentId!,
        courseId: gradeData.courseId!,
        score: gradeData.score!,
        feedback: gradeData.feedback,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setGrades([...grades, newGrade]);
    }
    setIsEditorOpen(false);
    setEditingGrade(null);
  };

  const handleDeleteGrade = (gradeId: string) => {
    if (confirm('Estas seguro de borrar este grado?')) {
      setGrades(grades.filter(g => g.id !== gradeId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Sistema de calificaciones academico</h1>
                <p className="text-sm text-gray-500">
                  sesion iniciada como {user?.name} ({user?.role})
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Cerrar sesion
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GradesList
          grades={visibleGrades}
          courses={DEMO_COURSES}
          currentUser={user!}
          onEdit={(grade) => {
            setEditingGrade(grade);
            setIsEditorOpen(true);
          }}
          onDelete={handleDeleteGrade}
          onAdd={() => {
            setEditingGrade(null);
            setIsEditorOpen(true);
          }}
        />
      </main>

      {isEditorOpen && (
        <GradeEditor
          grade={editingGrade}
          courses={DEMO_COURSES}
          onSave={handleSaveGrade}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingGrade(null);
          }}
        />
      )}
    </div>
  );
}

function AppContent() {
  const { user } = useAuth();
  return user ? <Dashboard /> : <Login />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
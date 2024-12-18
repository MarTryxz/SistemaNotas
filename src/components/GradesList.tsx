import React from 'react';
import { Grade, User, Course } from '../types';
import { PlusCircle, Edit, Trash, Book } from 'lucide-react';

interface GradesListProps {
  grades: Grade[];
  courses: Course[];
  currentUser: User;
  onEdit: (grade: Grade) => void;
  onDelete: (gradeId: string) => void;
  onAdd: () => void;
}

export default function GradesList({ 
  grades, 
  courses, 
  currentUser, 
  onEdit, 
  onDelete, 
  onAdd 
}: GradesListProps) {
  const canCreate = ['admin', 'teacher'].includes(currentUser.role);

  const getCourseName = (courseId: string) => {
    return courses.find(c => c.id === courseId)?.name || 'Unknown Course';
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Ramos</h2>
        {canCreate && (
          <button
            onClick={onAdd}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Añadir ramo
          </button>
        )}
      </div>
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ramo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Puntaje (%)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Feedback
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {grades.map((grade) => (
              <tr key={grade.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Book className="h-5 w-5 text-gray-400 mr-2" />
                    <div className="text-sm font-medium text-gray-900">
                      {getCourseName(grade.courseId)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${grade.score >= 90 ? 'bg-green-100 text-green-800' :
                    grade.score >= 80 ? 'bg-blue-100 text-blue-800' :
                    grade.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'}`}>
                    {grade.score}%
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 line-clamp-2">
                    {grade.feedback || 'No feedback provided'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(grade.updatedAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {(currentUser.role === 'admin' || currentUser.role === 'teacher') && (
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => onEdit(grade)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(grade.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {grades.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron ramos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
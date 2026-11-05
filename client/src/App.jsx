import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from './services/studentApi';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [alert, setAlert] = useState(null);

  const formSectionRef = useRef(null);

  // Load students on mount
  useEffect(() => {
    loadStudents();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Automatically clear alert after 5 seconds
    setTimeout(() => {
      setAlert((current) => (current && current.message === message ? null : current));
    }, 5000);
  };

  const loadStudents = async () => {
    setLoading(true);
    try {
      const data = await getAllStudents();
      // Ensure data is an array
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showAlert(
        'error',
        'Could not connect to the Student API. Please make sure the Spring Boot server is running on port 8080.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update existing student
        const updated = await updateStudent(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showAlert('success', `Student #${editingStudent.id} (${updated.firstname} ${updated.lastname}) was successfully updated!`);
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await createStudent(formData);
        setStudents((prev) => [...prev, created]);
        showAlert('success', `New student ${created.firstname} ${created.lastname} registered successfully!`);
      }
    } catch (err) {
      console.error('Error saving student:', err);
      showAlert('error', err.message || 'An error occurred while saving the student.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    setDeletingId(id);
    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
      showAlert('success', `Student #${id} has been permanently deleted.`);
    } catch (err) {
      console.error('Error deleting student:', err);
      showAlert('error', err.message || `Failed to delete student #${id}.`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleStartEdit = (student) => {
    setEditingStudent(student);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        onRefresh={loadStudents}
        loading={loading}
        totalCount={students.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* In-page Alert Banner (No modal) */}
        <AlertBanner alert={alert} onDismiss={() => setAlert(null)} />

        {/* Responsive Layout: Form & Directory */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Card (Desktop: 5 cols, Mobile: full width) */}
          <div ref={formSectionRef} className="lg:col-span-5 lg:sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Student Table / Directory (Desktop: 7 cols, Mobile: full width) */}
          <div className="lg:col-span-7">
            <StudentTable
              students={students}
              loading={loading}
              editingStudentId={editingStudent ? editingStudent.id : null}
              onEdit={handleStartEdit}
              onDelete={handleDeleteStudent}
              deletingId={deletingId}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        <p>Student CRUD Management System &bull; Vite React &bull; Tailwind CSS &bull; Spring Boot</p>
      </footer>
    </div>
  );
}

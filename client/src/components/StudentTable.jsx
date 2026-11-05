import React, { useState } from 'react';

export default function StudentTable({
  students,
  loading,
  editingStudentId,
  onEdit,
  onDelete,
  deletingId,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);

  // Filter students based on search input
  const filteredStudents = students.filter((student) => {
    const term = searchTerm.toLowerCase();
    const fullName = `${student.firstname || ''} ${student.lastname || ''}`.toLowerCase();
    const course = (student.course || '').toLowerCase();
    const section = (student.section || '').toLowerCase();
    const id = String(student.id || '');

    return fullName.includes(term) || course.includes(term) || section.includes(term) || id.includes(term);
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Table Header Controls */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Student Directory</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {filteredStudents.length} of {students.length} student records
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, course, section..."
            className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-xs"
          />
          <svg
            className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-100/70 text-slate-700 text-xs font-semibold uppercase tracking-wider">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">First Name</th>
              <th className="py-3 px-4">Last Name</th>
              <th className="py-3 px-4">Course</th>
              <th className="py-3 px-4">Section</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && students.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <svg className="animate-spin h-6 w-6 text-indigo-600" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <span className="text-sm">Loading student directory...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-12 text-center text-slate-500">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="w-10 h-10 text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                    <p className="font-medium text-slate-700">No students found</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {searchTerm ? 'Try adjusting your search criteria.' : 'Add your first student using the form above.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const isBeingEdited = editingStudentId === student.id;
                const isConfirmingDelete = confirmingDeleteId === student.id;
                const isDeleting = deletingId === student.id;

                return (
                  <tr
                    key={student.id}
                    className={`transition-colors hover:bg-slate-50/80 ${
                      isBeingEdited ? 'bg-amber-50/70 border-l-4 border-amber-500' : ''
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-xs font-semibold text-slate-500">
                      #{student.id}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {student.firstname}
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-800">
                      {student.lastname}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                        {student.course}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-medium">
                      {student.section}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {/* NO MODALS: Inline actions & confirmation */}
                      {isConfirmingDelete ? (
                        <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-lg">
                          <span className="text-xs text-rose-700 font-semibold">Delete?</span>
                          <button
                            onClick={() => {
                              onDelete(student.id);
                              setConfirmingDeleteId(null);
                            }}
                            disabled={isDeleting}
                            className="px-2 py-0.5 text-xs font-semibold rounded bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
                          >
                            {isDeleting ? '...' : 'Yes'}
                          </button>
                          <button
                            onClick={() => setConfirmingDeleteId(null)}
                            disabled={isDeleting}
                            className="px-2 py-0.5 text-xs font-medium rounded bg-white text-slate-600 border border-slate-300 hover:bg-slate-100 transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => onEdit(student)}
                            className="px-3 py-1 text-xs font-medium rounded-lg text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setConfirmingDeleteId(student.id)}
                            className="px-3 py-1 text-xs font-medium rounded-lg text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition cursor-pointer"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

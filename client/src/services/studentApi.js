// Determine API base URL: Use VITE_API_URL in production (Render) or default to '/tayag/students' for local proxy
const RAW_URL = import.meta.env.VITE_API_URL;
const BASE_HOST = RAW_URL ? RAW_URL.replace(/\/+$/, '') : '';
const API_BASE = `${BASE_HOST}/tayag/students`;

/**
 * Fetch all students from the API
 */
export async function getAllStudents() {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error(`Failed to fetch students (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Fetch a single student by ID
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE}/${id}`);
  if (!response.ok) {
    throw new Error(`Student #${id} not found`);
  }
  return response.json();
}

/**
 * Create a new student
 */
export async function createStudent(studentData) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (Status: ${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student #${id}`);
  }
  return response.json();
}

/**
 * Delete a student by ID
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student #${id}`);
  }
  return response.text();
}

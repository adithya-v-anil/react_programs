import React, { useState } from "react";

export default function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editRoll, setEditRoll] = useState("");
  const [editClass, setEditClass] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !roll.trim() || !studentClass.trim()) return;

    const exists = students.some((s) => s.roll === roll.trim());
    if (exists) {
      alert("Roll number must be unique.");
      return;
    }

    const newStudent = {
      id: students.length + 1,
      name: name.trim(),
      roll: roll.trim(),
      class: studentClass.trim(),
    };

    setStudents([...students, newStudent]);
    setName("");
    setRoll("");
    setStudentClass("");
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    if (editingId === id) setEditingId(null);
  };

  const startEdit = (student) => {
    setEditingId(student.id);
    setEditName(student.name);
    setEditRoll(student.roll);
    setEditClass(student.class);
  };

  const saveEdit = (id) => {
    if (!editName.trim() || !editRoll.trim() || !editClass.trim()) return;

    const exists = students.some((s) => s.roll === editRoll.trim() && s.id !== id);
    if (exists) {
      alert("Roll number must be unique.");
      return;
    }

    setStudents(
      students.map((s) =>
        s.id === id
          ? {
              ...s,
              name: editName.trim(),
              roll: editRoll.trim(),
              class: editClass.trim(),
            }
          : s
      )
    );

    setEditingId(null);
  };

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Student List Management App</h2>

      {/* Add Student Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Roll number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Class"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button>Add Student</button>
      </form>

      <input
        placeholder="Search by student name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Roll</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          ) : (
            filteredStudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>
                  {editingId === s.id ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    s.name
                  )}
                </td>
                <td>
                  {editingId === s.id ? (
                    <input
                      value={editRoll}
                      onChange={(e) => setEditRoll(e.target.value)}
                    />
                  ) : (
                    s.roll
                  )}
                </td>
                <td>
                  {editingId === s.id ? (
                    <input
                      value={editClass}
                      onChange={(e) => setEditClass(e.target.value)}
                    />
                  ) : (
                    s.class
                  )}
                </td>
                <td>
                  {editingId === s.id ? (
                    <>
                      <button onClick={() => saveEdit(s.id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(s)}>Edit</button>
                      <button onClick={() => deleteStudent(s.id)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}


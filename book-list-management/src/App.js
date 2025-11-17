  import React, { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const addBook = (e) => {
    e.preventDefault();
    if (!bookName.trim()) return;

    setBooks([
      ...books,
      {
        id: books.length + 1,
        name: bookName.trim(),
        author: authorName.trim(),
        publishDate,
      },
    ]);

    setBookName("");
    setAuthorName("");
    setPublishDate("");
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const startEdit = (book) => {
    setEditingId(book.id);
    setEditingName(book.name);
  };

  const saveEdit = (id) => {
    if (!editingName.trim()) return;
    setBooks(
      books.map((b) => (b.id === id ? { ...b, name: editingName.trim() } : b))
    );
    setEditingId(null);
    setEditingName("");
  };

  const filteredBooks = books.filter((b) => {
    const t = searchTerm.toLowerCase();
    return (
      b.name.toLowerCase().includes(t) || b.author.toLowerCase().includes(t)
    );
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Book List Management App</h2>

      <form onSubmit={addBook} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Book name *"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          placeholder="Author name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <input
          type="date"
          value={publishDate}
          onChange={(e) => setPublishDate(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <button>Add Book</button>
      </form>

      <input
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "10px", display: "block" }}
      />

      <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Publish Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No books found
              </td>
            </tr>
          ) : (
            filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                  {editingId === book.id ? (
                    <input
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                    />
                  ) : (
                    book.name
                  )}
                </td>
                <td>{book.author}</td>
                <td>{book.publishDate}</td>
                <td>
                  {editingId === book.id ? (
                    <>
                      <button onClick={() => saveEdit(book.id)}>Save</button>
                      <button onClick={() => setEditingId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => startEdit(book)}>Edit</button>
                      <button onClick={() => deleteBook(book.id)}>Delete</button>
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

export default App;
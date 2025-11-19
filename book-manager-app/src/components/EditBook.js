import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    published_year: "",
    genre: ""
  });

  useEffect(() => {
    axios.get("https://worksheet-library.mashupstack.com/books/" + id)
      .then(response => {
        setBook(response.data);
      });
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    axios.put("https://worksheet-library.mashupstack.com/books/" + id, book)
      .then(() => {
        navigate("/");
      });
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Book</h1>

      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={book.title}
          onChange={e => setBook({...book, title: e.target.value})}
        /><br/><br/>

        <input 
          type="text"
          value={book.author}
          onChange={e => setBook({...book, author: e.target.value})}
        /><br/><br/>

        <input 
          type="number"
          value={book.published_year}
          onChange={e => setBook({...book, published_year: e.target.value})}
        /><br/><br/>

        <input 
          type="text"
          value={book.genre}
          onChange={e => setBook({...book, genre: e.target.value})}
        /><br/><br/>

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


const Books = () => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const FetchAllBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8000/books");
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        FetchAllBooks();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete("http://localhost:8000/books/" + id);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

  return (
    <>
      <h1>Hopago Books</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && <img src={books.cover} alt="" />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
            <button onClick={() => handleDelete(book.id)} className="delete">
              Delete
            </button>
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Update
              </Link>{" "}
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/add" style={{ textDecoration: "none", color: "inherit" }}>
          Add new book
        </Link>
      </button>
    </>
  );
}

export default Books
